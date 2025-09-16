import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}
        