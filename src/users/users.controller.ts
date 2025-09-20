import { Body, Controller, Get, Param, Patch,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
  
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.usersService.findOne(+id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id')id:string,@Body() Body:UpdateUserDto){
        return await this.usersService.update(+id,Body);
    }

}
