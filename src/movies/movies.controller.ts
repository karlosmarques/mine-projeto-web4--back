import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

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
}
