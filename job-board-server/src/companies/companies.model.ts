import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Vacancy} from "../vacancies/vacancies.model";


interface CompanyCreationAttrs{
    name : string;
    email : string;
    password : string;
    city: string;
    region: string;
}
@Table({tableName: "companies"})
export class Company extends Model<Company, CompanyCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull : false, unique: true})
    name: string;

    @Column({type: DataType.STRING, allowNull : false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull : true})
    phoneNumber: string;


    @Column({type: DataType.STRING, allowNull : false})
    password: string;

    @Column({type: DataType.TEXT, allowNull: true})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    region : string;

    @Column({type: DataType.STRING, allowNull: true})
    city : string;

    @HasMany(() => Vacancy)
    vacancies: Vacancy[];


    public async addVacancy(vacancy: Vacancy): Promise<void> {
        await this.$add('vacancies', vacancy);
    }



}