import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger('ValidationPipe');
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // console.log('value:', value);
    // console.log('metatype:', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // console.log(object);
    const errors = await validate(object);
    // console.log(errors);

    if (errors.length > 0 && errors[0].constraints['isNotEmpty']) {
      this.logger.warn('"name" parameter is empty');
      throw new BadRequestException('name parameter is empty');
    } else if (errors.length > 0 && errors[0].constraints['isInt']) {
      this.logger.error('"age" must be an integer');
      throw new BadRequestException('age must be an integer');
    }
    // if (errors.length > 0) {
    //   throw new BadRequestException('Validation failed');
    // }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
