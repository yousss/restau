import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    Logger
} from '@nestjs/common';
import { ItemDTO, CriteriasDto } from './dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ValidationPipe } from 'src/shared/validation.pipe';



@Controller('items')
export class ItemsController {
    private logger = new Logger('items');
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
    @UsePipes(new ValidationPipe())
    async create (@Body() item: ItemDTO): Promise<Item> {
        this.logger.log(JSON.stringify(item));
        return await this.itemsService.create(item);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update (@Param('id') id: string, @Body() item: Partial<ItemDTO>): Promise<Item> {
        this.logger.log(JSON.stringify(item));
        return await this.itemsService.update(id, item);
    }

    @Delete(':id')
    async delete (@Param('id') id: string): Promise<boolean> {
        return await this.itemsService.delete(id);
    }
}