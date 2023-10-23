import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Vacancy} from "./vacancies.model";
import {Company} from "../companies/companies.model";

@Injectable()
export class VacanciesService {
    constructor(@InjectModel(Vacancy) private vacancyModel: typeof Vacancy,
                @InjectModel(Company) private companyModel: typeof Company) {
    }
    async getAll(){
        const vacancies = this.vacancyModel.findAll();
        return vacancies;
    }

    async getById(id: number){
        const vacancy = this.vacancyModel.findByPk(id);
        return vacancy;
    }

    async getByCompany(companyName: string){
        const company = await this.companyModel.findOne({where: {name:companyName}});
        const vacancies = this.vacancyModel.findAll({where:{companyId: company.id}});
        return vacancies;
    }
}
