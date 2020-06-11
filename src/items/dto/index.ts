export class CreateItemDto {
    name: string;
    price: number;
    description: string;
    image: string;
}
export class UpdateItemDto {
    name: string;
    price: number;
    description: string;
    image: string;
}

export class CriteriasDto {
    limit: number;
    orderByType: string;
    perPage: number;
    pageNumber: number;
}

