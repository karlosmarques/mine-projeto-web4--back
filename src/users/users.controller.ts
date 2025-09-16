import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
  
    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.usersService.findOne(+id);

    }
    @Patch(':id')
    async update(@Param('id')id:string,@Body() Body:UpdateUserDto){
        return await this.usersService.update(+id,Body);
    }

}
