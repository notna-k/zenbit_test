import { Injectable } from '@nestjs/common';
import {Company} from "./companies.model";
import {UpdateCompanyDto} from "./dto/update-company";
import {ApiError} from "../exceptions/api-errors";
import {CompanyJwtPayload} from "../auth/interfaces/companyJwtPayload";
import {CreateVacancyDto} from "../vacancies/dto/create-vacancy";
import {Vacancy} from "../vacancies/vacancies.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Vacancy) private vacancyModel: typeof Vacancy,
        @InjectModel(Company) private companyModel: typeof Company
    ) {
    }
    async getAll(){
        const companies = this.companyModel.findAll();
        return companies;
    }

    async getOnebyId(id: number){
        const company = this.companyModel.findByPk(id);
        return company;
    }

    async getOneByName(name: string){
        const company = this.companyModel.findOne({where: {name}});
        return company;
    }

    async getByCity(city: string){
        const companies = this.companyModel.findAll({where:{city}});
        return companies;
    }

    async patch(updateCompanyDto: UpdateCompanyDto){
        const {...updateValues} = updateCompanyDto;
        if(updateValues.id){
            await this.companyModel.update(
                {...updateValues},
                {
                    where: {
                        id: updateValues.id
                    }
                }
            );
            const updatedUser = this.companyModel.findByPk(updateValues.id)
            return updatedUser;
        } else if (updateValues.email){
            await Company.update(
                {...updateValues},
                {
                    where: {
                        email: updateValues.email
                    }
                }
            );
            const updatedUser = this.companyModel.findByPk(updateValues.id)
            return updatedUser;
        } else throw ApiError.BadRequestException();
    }

    async getProfile(companyJwtPayload: CompanyJwtPayload){
        const company = this.companyModel.findByPk(companyJwtPayload.id);
        return company;
    }

    async createVacancy(createVacancyDto: CreateVacancyDto, companyId: number){
        const company = await this.companyModel.findByPk(companyId);
        const vacancy = await this.vacancyModel.create(createVacancyDto);
        await vacancy.setCompany(company);
        await company.addVacancy(vacancy);
        return vacancy;
    }
}
