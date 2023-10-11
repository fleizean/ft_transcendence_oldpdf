import { UserLoginDto } from 'src/entities/dto/userLoginDto';
import { RandomText } from '../../core/utilities/randomText/randomText';
import { JwtHelper } from '../../core/utilities/security/jwt/jwtHelper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { User } from 'src/entities/concrete/user.entity';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { Messages } from 'src/business/const/messages';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { UserRegisterDto } from 'src/entities/dto/userRegisterDto';


@Injectable()
export class AuthGoogleService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private readonly configService: ConfigService,
    private readonly hashingHelper: HashingHelper,
    private readonly tokenHelper: JwtHelper,
  ) {}

  public async login(code: string): Promise<IDataResult<User>> {
    const userInfo = await this.baseGoogleAuth(code, 'login');
    const UserLoginDto: UserLoginDto = {
      email: userInfo.email,
      password: String(userInfo.id + 'sifredeneme'), // kullanıcı auth ile login olduğunda id + sifredeneme onun passwordu oluyor aslında güvenlik sebebi ile mantıksız randomtext yapmamız gerek ama şuanlık kalmalı
    };
    const userToCheck = (
      await this.userService.getByMail(UserLoginDto.email)
    ).data;
    if (!userToCheck) {
      return new ErrorDataResult<User>(null, Messages.UserNotFound);
    }

    const isPasswordValid = await this.hashingHelper.verifyPasswordHash(
        UserLoginDto.password,
      userToCheck.passwordHash,
      userToCheck.passwordsalt,
    );

    if (!isPasswordValid) {
      return new ErrorDataResult<User>(null, Messages.PasswordError);
    }
    return new SuccessDataResult<User>(userToCheck, Messages.SuccessfulLogin);
  }

  public async register(code: string): Promise<IDataResult<User>> {
    const userInfo = await this.baseGoogleAuth(code, 'register');
    console.log('userInfo ' + JSON.stringify(userInfo));
    const password = String(userInfo.id + 'sifredeneme'); // kullanıcı auth ile register olduğunda id + sifredeneme onun passwordu oluyor aslında güvenlik sebebi ile mantıksız  randomtext yapmamız gerek ama şuanlık kalmalı
    const UserRegisterDto: UserRegisterDto = {
      email: userInfo.email,
      password: password,
      firstName: String(userInfo.name).split(' ')[0],
      lastName: userInfo.family_name,
      nickName:
        String(userInfo.name).charAt(0) +
        String(userInfo.family_name) +
        RandomText.makeText(10),
    };
    const userExists = this.authService.userExists(UserRegisterDto);
    if (!(await userExists).success) {
      return new ErrorDataResult<User>(null, (await userExists).message);
    }
    const result = await this.authService.register(
        UserRegisterDto,
      password,
    );
    return new SuccessDataResult<User>(result.data, Messages.UserRegistered);
  }

  private async baseGoogleAuth(
    code: string,
    loginOrRegister: string,
  ): Promise<any> {
    const UID = this.configService.get<string>('GOOGLE_AUTH_UID');
    const SECRET = this.configService.get<string>('GOOGLE_AUTH_SECRET');

    const API_URL = 'https://oauth2.googleapis.com';
    const form = new URLSearchParams();
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('client_id', UID as string);
    form.append('client_secret', SECRET as string);
    form.append(
      'redirect_uri',
      'http://localhost:3000/api/auth-google/' + loginOrRegister,
    );

    const responseToken = await fetch(API_URL + '/token', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const dataToken = await responseToken.json();

    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const userInfoHeaders = {
      Authorization: `Bearer ${dataToken.access_token}`,
    };
    const responseUserInfo = await fetch(userInfoUrl, {
      headers: userInfoHeaders,
    });
    const userInfo = await responseUserInfo.json();
    return userInfo;
  }
}
