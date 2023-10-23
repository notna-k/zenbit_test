import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Company} from "../companies/companies.model";
import {BelongsTo} from "sequelize-typescript";


interface VacancyCreationAttrs{
    head: string;
    body: string;
    skills: string;
    experience: string;
    salary: string;
    remote: boolean;
    company: Company;

}
@Table({tableName: "vacancies"})
export class Vacancy extends Model<Vacancy, VacancyCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull : false})
    head: string;

    @Column({type: DataType.TEXT, allowNull : false})
    body: string;

    @Column({type: DataType.STRING, allowNull : true})
    experience: string;

    @Column({type: DataType.STRING, allowNull: true})
    salary: string;

    @Column({type: DataType.BOOLEAN, allowNull : false})
    remote: boolean;

    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER, allowNull: true})
    companyId: number;

    @BelongsTo(() => Company)
    company: Company

    public setCompany(company: Company){
        this.company = company;
        this.companyId = company.id;
    }


}