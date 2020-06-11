import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsString() @IsOptional() readonly id: string;
    @IsString() @IsNotEmpty() readonly name: string;
    @IsNumber() @IsNotEmpty() readonly price: number;
    @IsNumber() @IsNotEmpty() readonly discount: number;
    @IsString() readonly description: string;
    @IsString() @IsNotEmpty() readonly image: string;
}
export class UpdateItemDto {
    @IsString() @IsOptional() readonly id: string;
    @IsString() @IsNotEmpty() readonly name: string;
    @IsNumber() @IsNotEmpty() readonly price: number;
    @IsNumber() @IsNotEmpty() readonly discount: number;
    @IsString() readonly description: string;
    @IsString() @IsNotEmpty() readonly image: string;
}

export class CriteriasDto {
    limit: number;
    orderByType: string;
    perPage: number;
    pageNumber: number;
}

