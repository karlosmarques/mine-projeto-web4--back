import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { pesquisaDto } from './dtos/pesquisa';
import { retry } from 'rxjs';

@Injectable()
export class MoviesService {

    constructor(private prisma: PrismaService) {}

    async findAll(){
        const movies = await this.prisma.movie.findMany();
        return movies;
    }


    async findOne(id:number){
        const movie = await this.prisma.movie.findUnique({
            where:{id},
            include:{genre:true}
        })
        if(!movie){
            throw new Error("Filme não encontrado");
        }
        return movie;
    }

    async pesquisa(data:pesquisaDto) {
       const findmovie = await this.prisma.movie.findMany({
            where: {
                title: data.title
            },
            include: {
                genre: true
            }
       })
       return findmovie
    }

}
        