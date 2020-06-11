import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsString() @IsOptional() readonly _id: string;
    @IsString() @IsNotEmpty() readonly username: string;
    @IsString() @IsNotEmpty() readonly password: string;
}

export class CriteriaDto {
    limit: number;
    orderByType: string;
    perPage: number;
    pageNumber: number;
}

