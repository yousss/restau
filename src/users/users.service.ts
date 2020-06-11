import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel } from './schemas/user.schema'
import { CriteriaDto, UserDto } from './dto/index';
import { User } from './interface/user.interface'


@Injectable()
export class UsersService {
    constructor(@InjectModel('UserModel') private userModel: Model<UserModel>) { }

    async findAll (clauses: CriteriaDto): Promise<User[]> {
        const perPage = 10;

        return await this.userModel
            .find(function (err, user) {
                return user;
            })
            .limit(clauses.perPage || perPage)
            .skip((clauses.pageNumber - 1) * (perPage || clauses.perPage))
            .sort({ name: clauses.orderByType || 'asc' });
    }

    async create (newItem: UserDto): Promise<User> {
        const createdItem = new this.userModel(newItem);
        return await createdItem.save();
    }

    async findById (id: string): Promise<User> {
        const item = await this.userModel.findById(id, function (error, user) {
            if (error) {
                return new Error('No record found');
            }
            if (!user) {
                return 'No record found one';
            }
        });
        return item
    }

    async update (id: string, userDto: UserDto): Promise<User> {
        const item = await this.userModel.findByIdAndUpdate(id, userDto, { new: true }, function (error, user) {
            if (error) {
                throw new Error('No record found to update');
            }
            return user;
        });
        return item;
    }

    async delete (id: string): Promise<User> {

        return await this.userModel.findByIdAndRemove(id, function (error, item) {
            if (error) {
                throw new Error('No record found to delete');
            }
            return item;
        })
    }
}
