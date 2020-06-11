import { IsString, IsNumber, IsOptional } from 'class-validator';

export class Item {
    @IsString() @IsOptional() readonly id: string;
    @IsString() readonly name: string;
    @IsNumber() readonly price: number;
    @IsNumber() readonly discount: number;
    @IsString() readonly description: string;
    @IsString() readonly image: string;
}
