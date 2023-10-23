import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Company} from "../companies/companies.model";
import {Vacancy} from "./vacancies.model";
import {CompaniesModule} from "../companies/companies.module";

@Module({
  providers: [VacanciesService],
  controllers: [VacanciesController],
  imports: [
    SequelizeModule.forFeature([Company, Vacancy]),
      CompaniesModule,
  ],
  exports: [VacanciesModule]
})
export class VacanciesModule {}
