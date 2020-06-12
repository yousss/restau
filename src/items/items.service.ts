import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ItemDTO, CriteriasDto } from './dto/index'
import { Item as ItemModel } from './schemas/item.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {

    constructor(@InjectModel(ItemModel.name) private itemModel: Model<ItemModel>) { }

    async findAll (clauses: CriteriasDto): Promise<Item[]> {
        const perPage = 10;

        return await this.itemModel
            .find(function (err, item) {
                return item;
            })
            .limit(clauses.perPage || perPage)
            .skip((clauses.pageNumber - 1) * (perPage || clauses.perPage))
            .sort({ name: clauses.orderByType || 'asc' });
    }

    async create (newItem: ItemDTO): Promise<Item> {
        const createdItem = new this.itemModel(newItem);
        return await createdItem.save();
    }

    async findById (id: string): Promise<Item> {
        const item = await this.itemModel.findOne({ _id: id });
        if (!item) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return item;
    }

    async update (id: string, updatedItem: Partial<ItemDTO>): Promise<Item> {
        const { modifiedCount } = await this.itemModel.updateOne({ _id: id }, updatedItem);
        if (modifiedCount !== 0) {
            return await this.itemModel.findOne({ _id: id });
        }
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    async delete (id: string): Promise<boolean> {
        const { deletedCount } = await this.itemModel.deleteOne({ _id: id });
        if (deletedCount !== 0)
            return true

    }
}