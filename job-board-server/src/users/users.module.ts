import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from "./users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {JwtModule} from "@nestjs/jwt";
import process from "process";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: /*process.env.JWT_ACCESS_SECRET || */"alsosomesecretbutaccessjwtkey",
      signOptions: { expiresIn: /*process.env.JWT_EXPIRATION_TIME ||*/ "12h"},
    })]
})
export class UsersModule {}
