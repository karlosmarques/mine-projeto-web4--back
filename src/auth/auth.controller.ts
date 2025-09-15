import { Body, Controller,Post } from '@nestjs/common';
import type { RegisterDto } from './dtos/auth';
import type { LoginDto } from './dtos/auth';
import { AuthService } from './auth.service';

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

}

