

import {ConfigModule} from "@nestjs/config";

import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {Module} from "@nestjs/common";
import { CompaniesModule } from './companies/companies.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import * as process from "process";
import * as dotenv from "dotenv"
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import {Company} from "./companies/companies.model";
import {Vacancy} from "./vacancies/vacancies.model";
import {JwtModule} from "@nestjs/jwt";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath : '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Company, Vacancy],
            autoLoadModels : true
        }),
        UsersModule,
        AuthModule,
        CompaniesModule,
        VacanciesModule,
        JwtModule.register({ secret: process.env.JWT_ACCESS_SECRET })
    ],
})
export class AppModule{

}

