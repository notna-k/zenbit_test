import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {SignUserDto} from "../users/dto/sign-user";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import {UserJwtPayload} from "./interfaces/userJwtPayload";
import {CreateUserDto} from "../users/dto/create-user";
import * as bcrypt from 'bcrypt';


import * as process from "process";
import {CreateCompanyDto} from "../companies/dto/create-company";
import {Company} from "../companies/companies.model";
import {ApiError} from "../exceptions/api-errors";
import {SignCompanyDto} from "../companies/dto/sign-company";
import {CompanyJwtPayload} from "./interfaces/companyJwtPayload";



@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {
    }


    async signInUser(email: string, password: string): Promise<string> {
        const user = await User.findOne({where: {email: email}})

        if (!user) throw new UnauthorizedException('Incorrect login credentials!');
        const passwordCheck = await this.validateUserPassword(password, user.id);
        if (!passwordCheck) throw new UnauthorizedException('Incorrect login credentials!');

        const id = user.id;
        const payload: UserJwtPayload = { email, id, type: "USER"};
        const token: string = this.jwtService.sign(payload);
        return token;

    }

    async signInCompany(email: string, password: string): Promise<string> {
        const company = await Company.findOne({where: {email: email}})

        if (!company) throw new UnauthorizedException('Incorrect login credentials!');
        const passwordCheck = await this.validateUserPassword(password, company.id);
        if (!passwordCheck) throw new UnauthorizedException('Incorrect login credentials!');
        const id = company.id;
        const payload: CompanyJwtPayload = { email, id, type: "COMPANY"};
        const token: string = this.jwtService.sign(payload);
        return token;

    }

    async registerUser( name: string , email: string, password: string): Promise<string> {


        console.log(password);
        password = await bcrypt.hash(password, 8);
        const checkUser = await User.findOne({where:{email}});
        if(checkUser) throw new BadRequestException("User with given email already registered")

        const user = await User.create({name, email, password});
        if (!user) throw new BadRequestException('Incorrect registration credentials!');


        const id = user.id;
        const payload: UserJwtPayload = { email, id, type: "USER"};
        const token: string = this.jwtService.sign(payload);
        return token ;

    }

    async registerCompany( name: string, email: string, password: string, region: string, city: string): Promise<string> {


        password = bcrypt.hashSync(password, 8);

        const checkCompany = await Company.findOne({where:{email}});
        if(checkCompany) throw new BadRequestException("Company with given email already registered")
        const checkUser = await User.findOne({where:{email}});
        if(checkUser) throw new BadRequestException("Company with given email already registered")

        const company = await Company.create({name, email, password, region, city});
        if (!company) throw new BadRequestException('Incorrect registration credentials!');


        const id = company.id;
        const payload: CompanyJwtPayload = { email, id, type: "COMPANY" };
        const token: string = this.jwtService.sign(payload);
        return token ;

    }

    async validateUserPassword(password: string, userid: number): Promise<boolean>{
        const user = await User.findByPk(userid);
        return bcrypt.compareSync(password, user.password);
    }

    async validateCompanyPassword(password: string, companyid: number): Promise<boolean>{
        const company = await Company.findByPk(companyid);
        return bcrypt.compareSync(password, company.password);
    }




}