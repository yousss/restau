import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp (
        @Body(new ValidationPipe()) authCredentialsDto: AuthCredentialsDto
    ): Promise<any> {
        return this.authService.signUp(authCredentialsDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async login (@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getMe (@Request() req): Promise<any> {
        return req.user;
    }

}