import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './core/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './dataAccess/typeorm.service';

const envFilePath: string = getEnvPath(`${__dirname}/core/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:envFilePath, isGlobal: true}),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService}),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
