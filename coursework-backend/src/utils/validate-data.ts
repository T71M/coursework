import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export const validateData = async <T extends object>(dto: T) => {
  const errors = await validate(dto);
  if (errors.length) {
    throw new BadRequestException(errors);
  }
};
