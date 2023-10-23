import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";
import {AuthController} from "./auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    ConfigModule.forRoot({
      envFilePath : '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET || "alsosomesecretbutaccessjwtkey",
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || "12h"},
    })]
})
export class AuthModule {}
