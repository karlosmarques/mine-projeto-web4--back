import { Body, Controller, Get, Param,UseGuards,Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { pesquisaDto } from './dtos/pesquisa';

@Controller('movies')
export class MoviesController {

    constructor(private moviesService: MoviesService) {}
    
  
    @Get()
    async findAll(){
        return await this.moviesService.findAll();
    }

    
    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.moviesService.findOne(+id);
    }

    @Post('pesquisa')
    async pesqusa(@Body() Body:pesquisaDto) {
        return await this.moviesService.pesquisa(Body);
    }
}
