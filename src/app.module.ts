import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';



@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [AuthService, PrismaService, UsersService],
})

export class AppModule {}
