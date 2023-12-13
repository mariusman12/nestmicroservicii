import { PartialType } from '@nestjs/mapped-types';
import { CreateReservetionDto } from './create-reservetion.dto';

export class UpdateReservetionDto extends PartialType(CreateReservetionDto) {}
