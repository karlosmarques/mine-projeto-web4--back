import { Controller, Get, Param,UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {

    constructor(private moviesService: MoviesService) {}
    @UseGuards(AuthGuard)   
    @Get()
    async findAll(){
        return await this.moviesService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.moviesService.findOne(+id);
    }
}
