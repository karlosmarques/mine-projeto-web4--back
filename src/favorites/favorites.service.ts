import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) {}
    
    async favorite(movieID:number,userId:number){
        const movie = await this.prisma.movie.findUnique({
            where:{id:movieID}
        })
        if(!movie){
            throw new Error("Filme não encontrado");
        }
        const favorite = await this.prisma.favorite.create({
            data:{movieId:movieID,
              userId: userId,
            }
        })
        return favorite;
    }

    async findAll(userId:number){
        const favorites = await this.prisma.favorite.findMany({
            where:{userId:userId},
            include:{movie:true}
        })
        return favorites;
    }

    async removeFavorite(userId: number, movieId: number) {
  const favorite = await this.prisma.favorite.findFirst({
    where: {
      userId,
      movieId,
    },
  });

  if (!favorite) {
    throw new NotFoundException('Favorito não encontrado');
  }

  return this.prisma.favorite.delete({
    where: { id: favorite.id },
  });
}

}
