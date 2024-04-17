import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InvalidParamException } from '../exceptions/invalid-param.exception';
import { RetCodeEnum } from '../core/common/return-code';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    console.log('>>>errors', errors);
    if (errors.length > 0) {
      for (const key in errors[0].constraints) {
        throw new InvalidParamException(errors[0].constraints[key], RetCodeEnum.PARAM_ERROR);
      }
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}