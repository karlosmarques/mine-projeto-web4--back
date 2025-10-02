import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/users';


@Injectable()
export class UsersService {
     constructor(private prisma: PrismaService){}
     async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
             where: {id},
             select:{
                username:true,
                email:true,
                imageUrl:true
             }
         })
         if(!user){
            throw new NotFoundException("Usuario não encontrado");
         }
         return user;
   }

   async update(id:number,data:UpdateUserDto){
        const user = await this.prisma.user.update({
            where:{id},data:{...data}
        })
        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }
       
   }




}
