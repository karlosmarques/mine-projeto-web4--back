import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [AuthService, PrismaService],
})

export class AppModule {}
