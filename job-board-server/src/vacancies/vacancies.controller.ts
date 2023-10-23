import {Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {VacanciesService} from "./vacancies.service";
import {AuthGuard} from "../auth/auth.guard";
import {UpdateCompanyDto} from "../companies/dto/update-company";
import {CreateVacancyDto} from "./dto/create-vacancy";

@Controller('/vacancies')
export class VacanciesController {
    constructor(private vacanciesService: VacanciesService) {

    }
    @Get("/")
    getAll(){
        return this.vacanciesService.getAll();
    }


    @Get("/")
    getById(@Query("id") id: number){
        return this.vacanciesService.getById(id);
    }


    @Get("/")
    getByCompany(@Query("company") company: string){
        return this.vacanciesService.getByCompany(company);
    }


    }



