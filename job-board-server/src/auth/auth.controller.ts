import {Body, Controller, Get, Inject, Param, Post, Res} from "@nestjs/common";
import {SignUserDto} from "../users/dto/sign-user";
import {CreateUserDto} from "../users/dto/create-user";
import {AuthService} from "./auth.service";
import {CreateCompanyDto} from "../companies/dto/create-company";
import {SignCompanyDto} from "../companies/dto/sign-company";


@Controller("/auth")
export class AuthController {
    constructor(private authService : AuthService) {
    }

    @Post("/registerCompany")
    async registerUser(@Body() createCompanyDto: CreateCompanyDto){
        try{
            const {name, email, password, region, city} = createCompanyDto;
            /*const obj = createCompanyDto.name;
            // first field of DTO object is somehow proper object with our fields
            // i do not really know how it works but it works .-.
            console.log(obj);
            const name = obj['name'];
            const email = obj['email'];
            const password = obj['password'];
            const region = obj['region'];
            const city = obj['city']*/
            const token = await this.authService.registerCompany(name, email, password, region, city);
            return token;
        }catch (e){
            return {Error: e.message};

        }
    }

    @Post("/loginCompany")
    async loginUser(@Body() signCompanyDto: SignCompanyDto){
        try{
            const obj = signCompanyDto.email;
            // first field of DTO object is somehow proper object with our fields
            // i do not really know how it works but it works .-.

            const email = obj['email'];
            const password = obj['password'];
            const token = await this.authService.signInCompany(email, password);
            return token;
        } catch(e){
            return {Error: e.message};
        }
    }

    @Post("/registerUser")
    async registerCompany(@Body() createUserDto: CreateUserDto){
        try{
            const obj = createUserDto.name;
            // first field of DTO object is somehow proper object with our fields
            // i do not really know how it works but it works .-.

            const name = obj['name'];
            const email = obj['email'];
            const password = obj['password'];
            const token = await this.authService.registerUser(name, email, password);
            return token;

        }catch (e){
            console.log(e);
            return {Error: e.message};
        }
    }

    @Post("/loginUser")
    async login (@Body() signUserDto: SignUserDto){
        try{
            const obj = signUserDto.email;
            // first field of DTO object is somehow proper object with our fields
            // i do not really know how it works but it works .-.

            const email = obj['email'];
            const password = obj['password'];
            const token = await this.authService.signInUser(email, password);
            return token;
        } catch(e){
            return {Error: e.message};
        }
    }


}