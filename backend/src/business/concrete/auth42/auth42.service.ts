import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { User } from 'src/entities/concrete/user.entity';
import { Messages } from 'src/business/const/messages';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { UserRegisterDto } from 'src/entities/dto/userRegisterDto';
import { AuthService } from 'src/business/concrete/auth/auth.service';
import { UserService } from '../user/user.service';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { RandomText } from 'src/core/utilities/randomText/randomText';
import { UserLoginDto } from 'src/entities/dto/userLoginDto';
import { HashingHelper } from 'src/core/utilities/security/hashing/hashingHelper';
import { JwtHelper } from 'src/core/utilities/security/jwt/jwtHelper';

@Injectable()
export class Auth42Service {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private readonly configService: ConfigService,
    private readonly hashingHelper: HashingHelper,
    private readonly tokenHelper: JwtHelper,
  ) { }

  public async login(code: string): Promise<IDataResult<User>> {
    const userInfo = await this.base42Auth(code, "login");
    let UserLoginDto: UserLoginDto = {
      email: userInfo.email,
      password: String(userInfo.url + "sifredeneme")
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
    const userInfo = await this.base42Auth(code, "register");
    let password: string = String(userInfo.url + "sifredeneme");
    const UserRegisterDto: UserRegisterDto = {
      email: userInfo.email,
      password: password,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      nickName: userInfo.login,
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

  private async base42Auth(code: string, loginOrRegister: string): Promise<any> {
    const UID = this.configService.get<string>('42AUTH_UID');
    const SECRET = this.configService.get<string>('42AUTH_SECRET');
    const API_URL = 'https://api.intra.42.fr';
    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('client_id', UID as string);
    form.append('client_secret', SECRET as string);
    form.append('code', code);
    form.append('redirect_uri', 'http://localhost:3000/api/auth42/'+ loginOrRegister);

    const responseToken = await fetch(API_URL + '/oauth/token', {
      method: 'POST',
      body: form,
    });
    const dataToken = await responseToken.json();
    const responseInfo = await fetch('https://api.intra.42.fr/v2/me', {
      headers: {
        Authorization: 'Bearer ' + dataToken.access_token,
      },
    });
    const dataInfo = await responseInfo.json();
    return dataInfo;
  }
}
