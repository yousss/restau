import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { CreateItemDto, UpdateItemDto, CriteriasDto } from './dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';



@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    async findAll (@Query() query: CriteriasDto): Promise<Item[]> {
        return await this.itemsService.findAll(query);
    }

    @Get(':id')
    async findById (@Param('id') id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    async create (@Body() item: CreateItemDto): Promise<Item> {
        return await this.itemsService.create(item);
    }

    @Put(':id')
    async update (@Param('id') id: string, @Body() item: UpdateItemDto): Promise<Item> {
        return await this.itemsService.update(id, item);
    }

    @Delete(':id')
    async delete (@Param('id') id: string): Promise<boolean> {
        return await this.itemsService.delete(id);
    }
}