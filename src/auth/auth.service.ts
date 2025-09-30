import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService,  private mailService: MailService,){}


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

     async forgotPassword(email: string) {
    
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

   
    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );

    
    await this.mailService.sendPasswordReset(user.email, token);

    return { message: 'Email de recuperação enviado!' };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
     
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      
      await this.prisma.user.update({
        where: { id: payload.userId },
        data: { password: hashedPassword },
      });

      return { message: 'Senha atualizada com sucesso!' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

}
