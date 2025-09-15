import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Module({
  imports: [JwtModule.register({global:true, secret:JWT_SECRET.secret, signOptions:{expiresIn:"7200s"}})],
  controllers: [AuthController],
  providers: [AuthService,PrismaService]
})
export class AuthModule {}
