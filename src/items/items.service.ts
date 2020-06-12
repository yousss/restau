import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto, CriteriasDto } from './dto/index'
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

    async create (newItem: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(newItem);
        return await createdItem.save();
    }

    async findById (id: string): Promise<Item> {
        return await this.itemModel.findOne({ _id: id });
    }

    async update (id: string, updatedItem: UpdateItemDto): Promise<Item> {
        console.log(id)
        await this.itemModel.update({ _id: id }, updatedItem);
        return await this.itemModel.findOne({ _id: id });
    }

    async delete (id: string): Promise<boolean> {
        await this.itemModel.deleteOne({ _id: id });
        return true
    }
}