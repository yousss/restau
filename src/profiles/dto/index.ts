import { IsString, IsNumber, IsDate, IsEmail, IsOptional } from 'class-validator';

export class ProfileDTO {
    @IsString() firstName: string;
    @IsNumber() lastName: string;
    @IsNumber() phoneNumber: string;
    @IsEmail() @IsOptional() email: string;
    @IsString() @IsOptional() image: string;
    @IsDate() @IsOptional() dateOfBirth: Date;
}

export class CriteriasDto {
    limit: number;
    orderByType: string;
    perPage: number;
    pageNumber: number;
}

