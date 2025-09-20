import { Body, Controller,Post,Get,Request, UseGuards } from '@nestjs/common';
import type { RegisterDto } from './dtos/auth';
import type { LoginDto } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("register")
    async register(@Body() Body:RegisterDto){
        return await this.authService.register(Body);

    }

    @Post("login")
    async login(@Body() Body:LoginDto){
       return await this.authService.login(Body);
       
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async me(@Request() request){
        return request.user;
    }
}

