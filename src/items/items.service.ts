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
        const item = await this.itemModel.findById(id, function (error, item) {
            if (error) {
                return new Error('No record found');
            }
            if (!item) {
                return 'No record found one';
            }
        });

        return item

    }

    async update (id: string, updatedItem: UpdateItemDto): Promise<Item> {
        const item = await this.itemModel.findByIdAndUpdate(id, updatedItem, { new: true }, function (error, item) {
            if (error) {
                throw new Error('No record found to update');
            }
            return item;
        });
        return item;
    }

    async delete (id: string): Promise<Item> {

        return await this.itemModel.findByIdAndRemove(id, function (error, item) {
            if (error) {
                throw new Error('No record found to delete');
            }
            return item;
        })

    }
}