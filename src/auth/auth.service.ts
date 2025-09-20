import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService){}


     async register(data:RegisterDto){
        const usarioExistente = await this.prisma.user.findUnique({
            where:{
                email:data.email
            }
         })

         if(usarioExistente){
            throw new UnauthorizedException("Usuario ja existe");
         }

         const hashedPassword = await bcrypt.hash(data.password, 10);
         
         const novoUsuario  = await this.prisma.user.create({data:{
            email: data.email,
            password: hashedPassword,
            username: data.username,
            imageUrl: data.imageUrl
         }});
         return novoUsuario;
     }


     async login(data:LoginDto){
        const usuario = await this.prisma.user.findUnique({
         where:{
            email:data.email
         }
        })
        if(!usuario){
            throw new UnauthorizedException("Credenciais invalidas :)");
        }
        const passwordMatch = await bcrypt.compare(data.password, usuario.password);
        
        if(!passwordMatch){
            throw new UnauthorizedException("Credenciais invalidas");
        }
        const token =  await this.jwtService.signAsync({id:usuario.id, email:usuario.email, isAdmin:usuario.isAdmin});
        
         return {token};
     }
}
