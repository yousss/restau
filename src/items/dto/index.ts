import { IsString, IsNumber } from 'class-validator';

export class ItemDTO {

    @IsString() name: string;
    @IsNumber() price: number;
    @IsNumber() discount: number;
    @IsString() description: string;
    @IsString() image: string;
}

export class CriteriasDto {
    limit: number;
    orderByType: string;
    perPage: number;
    pageNumber: number;
}

