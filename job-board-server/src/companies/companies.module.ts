import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Vacancy} from "../vacancies/vacancies.model";
import {Company} from "./companies.model";

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesModule],
  imports: [
    SequelizeModule.forFeature([Company, Vacancy])
  ],
})
export class CompaniesModule {}
