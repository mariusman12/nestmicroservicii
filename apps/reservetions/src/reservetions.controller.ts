import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservetionsService } from './reservetions.service';
import { CreateReservetionDto } from './dto/create-reservetion.dto';
import { UpdateReservetionDto } from './dto/update-reservetion.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('reservetions')
export class ReservetionsController {
  constructor(private readonly reservetionsService: ReservetionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservetionDto: CreateReservetionDto, @CurrentUser() user:UserDto) {
   return  this.reservetionsService.create(createReservetionDto, user._id);


  } 

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.reservetionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.reservetionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateReservetionDto: UpdateReservetionDto) {
    return this.reservetionsService.update(id, updateReservetionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservetionsService.remove(id);
  }
}
