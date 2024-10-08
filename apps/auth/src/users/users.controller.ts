import { Body, Controller, Post,Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './models/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user:UserDocument){
        return user
    }
}
