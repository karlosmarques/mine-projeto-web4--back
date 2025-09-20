import { CanActivate, Injectable, UnauthorizedException, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException("token não encontrado")
        }
        try{
            const payload =this.jwtService.verify(token,{
                secret: jwtConstants.secret
            })

            request["user"] = payload;

        }catch (error){
            throw new UnauthorizedException("token invalido");
        }
        return true;
    }

private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
}
}