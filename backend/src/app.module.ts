import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './core/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './dataAccess/typeorm.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Auth42Module } from './modules/auth42/auth42.module';
import { UserAchievementModule } from './modules/user-achievement/user-achievement.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { UserOperationClaimsModule } from './modules/user-operationclaims/user-operationclaims.module';
import { OperationClaimsModule } from './modules/operationclaims/operationclaims.module';
import { AchievementModule } from './modules/achievement/achievement.module';

const envFilePath: string = getEnvPath(`${__dirname}/core/envs`); // /Users/fleizean/Desktop/transdance/backend/src/core/envs/development.env
console.log(envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true}),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService}),
    UserModule,
    AuthModule,
    Auth42Module,
    AuthGoogleModule,
    UserAchievementModule,
    UserOperationClaimsModule,
    OperationClaimsModule,
    AchievementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
  