import {BadRequestException, Injectable} from '@nestjs/common';
import {UserJwtPayload} from "../auth/interfaces/userJwtPayload";
import {User} from "./users.model";
import {UpdateCompanyDto} from "../companies/dto/update-company";
import {Company} from "../companies/companies.model";
import {ApiError} from "../exceptions/api-errors";
import {InjectModel} from "@nestjs/sequelize";
import {Vacancy} from "../vacancies/vacancies.model";
import {UpdateUserDto} from "./dto/update-user";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService
    ) {
    }
    getProfile(userJwtPayload: UserJwtPayload){
        const user = User.findByPk(userJwtPayload.id);
        return user;
    }
    async patch(token: string, updateUserDto: UpdateUserDto){
        const {...updateValues} = updateUserDto;

        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: /*process.env.JWT_ACCESS_SECRET || */"alsosomesecretbutaccessjwtkey",
            }
        );
        const userid = payload['id'];

        if(userid){
            const updatedUser = await this.userModel.update(
                {...updateValues},
                {
                    where: {
                        id: userid
                    }
                }
            );
            return await this.userModel.findByPk(userid);

        } else throw BadRequestException;


    }
}
