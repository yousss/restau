import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('UserModel') private userModel: Model<User>) { }

    async findOne (username: string): Promise<User> {
        return await this.userModel.findOne({ username })
    }

    async createOne (username: string, password: string): Promise<User> {
        const user = new this.userModel({ username, password });
        try {
            return await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }
}