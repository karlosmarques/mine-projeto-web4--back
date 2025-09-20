import { Controller, Param, Post, Get, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from "./favorites.service"
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('favorites')
export class FavoritesController {
    constructor(private favoriteService: FavoritesService) {}

    @UseGuards(AuthGuard)
    @Post(":movieID")
    async favorite(@Param("movieID") movieID:string, @Req() req){
        const user = req.user
        return await this.favoriteService.favorite(+movieID,user.id);
    }
    @UseGuards(AuthGuard)
    @Get("favoriteall")
    async findAll(@Req() req){
        const user = req.user
        return await this.favoriteService.findAll(user.id);
    }

}


