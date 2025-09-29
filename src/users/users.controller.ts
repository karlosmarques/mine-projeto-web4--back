import { Body, Controller, Get, Param, Patch,UseGuards,Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
  
    @UseGuards(AuthGuard)
    @Get('me')
    async findOne(@Request() req){
        return await this.usersService.findOne(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Patch('me')
    async update(@Request() req,Body:UpdateUserDto){
        return await this.usersService.update(req.user.id,Body);
    }

}
