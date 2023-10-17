import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
  } from '@nestjs/common';
  import { AuthService } from 'src/business/concrete/auth/auth.service';
  import { UserLoginDto } from 'src/entities/dto/userLoginDto';
  import { UserRegisterDto } from 'src/entities/dto/userRegisterDto';
  import { Request, Response } from 'express';
  
  @Controller('api/auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Res() response: Response, @Req() request: Request) {
      const UserLoginDto: UserLoginDto = {
        email: request.body.email,
        password: request.body.password,
      };
      const userToLogin = await this.authService.login(UserLoginDto);
      if (!userToLogin.success) {
        return response.status(HttpStatus.BAD_REQUEST).send(await userToLogin);
      }
  
      const result = await this.authService.createAccessToken(userToLogin.data);
      if (result.success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  
    @Post('register')
    async register(@Res() response: Response, @Req() request: Request) {
      const UserRegisterDto: UserRegisterDto = {
        email: request.body.email,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        nickName: request.body.nickName,
      };
      /* console.log('request.body.firstName', request.body.firstName)
      console.log('request.body.lastname', request.body.lastName) */
      const userExists = this.authService.userExists(UserRegisterDto);
      if (!(await userExists).success) {
        return response.status(HttpStatus.BAD_REQUEST).send(await userExists);
      }
      const registerResult = this.authService.register(
        UserRegisterDto,
        UserRegisterDto.password,
      );
      const result = this.authService.createAccessToken(
        (await registerResult).data,
      );
      if ((await result).success) {
        return response.status(HttpStatus.OK).send(await result);
      }
      return response.status(HttpStatus.BAD_REQUEST).send(await result);
    }
  }
  