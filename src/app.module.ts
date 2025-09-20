import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MoviesService } from './movies/movies.service';
import { FavoritesService } from './favorites/favorites.service';



@Module({
  imports: [AuthModule, UsersModule, MoviesModule, FavoritesModule],
  controllers: [],
  providers: [AuthService, PrismaService, UsersService, FavoritesService, MoviesService],
})

export class AppModule {}
