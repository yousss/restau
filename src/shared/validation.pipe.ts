import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async transform (value: any, { metatype }: ArgumentMetadata): Promise<any> {

        if (value instanceof Object && this.isEmpty(value)) {
            throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST);
        }

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${this.formatErrors(errors)} `, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private toValidate (metatype: any): boolean {
        const types: any[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors (errors: any[]) {
        return errors.map(error => {
            for (const property in error.constraints) {
                return error.constraints[property];
            }
        }).join(', ')
    }

    private isEmpty (value: any) {
        if (Object.keys(value).length > 0) {
            return false
        }
        return true
    }
}