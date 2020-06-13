import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService

    ) { }

    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            return await this.usersService.createOne(username, hashedPassword);
        } catch (error) {
            throw error
        }
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }

        const payload = { username, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser (username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
            return user;
        }

        return null;
    }
}