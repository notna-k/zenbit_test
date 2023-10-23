import {Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {CompaniesService} from "./companies.service";
import {UpdateCompanyDto} from "./dto/update-company";
import {AuthGuard} from "../auth/auth.guard";
import {CreateVacancyDto} from "../vacancies/dto/create-vacancy";

@Controller('/companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {
    }
    @Get("/")
    getAll(){
        return this.companiesService.getAll();
    }

    @Get("/profile")
    @UseGuards(AuthGuard)
    getProfile(@Request() req){
        const company = this.companiesService.getProfile(req.payload);
        console.log(company);
        return company;
    }

    @Get("/")
    getById(@Query("id") id: number){
        return this.companiesService.getOnebyId(id);
    }
    @Get("/")
    getByName(@Query("name") name: string){
        return this.companiesService.getOneByName(name);
    }

    @Get("/")
    getByCity(@Query("city") city: string){
        return this.companiesService.getByCity(city);
    }

    @Patch("/update")
    @UseGuards(AuthGuard)
    patch(@Body() updateCompanyDto: UpdateCompanyDto){
        try{
            const updatedCompany = this.companiesService.patch(updateCompanyDto);
        }catch (e){
            return {message: e.message}
        }
    }

    @UseGuards(AuthGuard)
    @Post("/addVacancy")
    addVacancy(@Request() req){
        const createVacancyDto: CreateVacancyDto = req.body;
        const companyId = req.payload.id;
        const vacancy = this.companiesService.createVacancy(createVacancyDto, companyId);
        return vacancy;
    }

}
