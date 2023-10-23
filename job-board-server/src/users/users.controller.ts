import {Body, Controller, Get, Headers, Patch, Req, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {UsersService} from "./users.service";
import {UpdateCompanyDto} from "../companies/dto/update-company";
import {UpdateUserDto} from "./dto/update-user";

@Controller('/users')
export class UsersController {
    constructor(private userService: UsersService) {
    }
    @Get("/profile")
    @UseGuards(AuthGuard)
    getProfile(@Request() req){
        const user = this.userService.getProfile(req.payload);
        return user;
    }

    @Patch("/update")
    @UseGuards(AuthGuard)
    patch(@Body() updateUserDto: UpdateUserDto, @Headers("Authorization") accessToken: string){
        try{
            const [type, token] = accessToken.split(' ') ?? [];


            const updatedUser = this.userService.patch(token, updateUserDto);
            return updatedUser;
        }catch (e){
            return {message: e.message}
        }
    }
}
