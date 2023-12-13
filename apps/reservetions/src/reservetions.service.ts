import { PAYMENTS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateReservetionDto } from './dto/create-reservetion.dto';
import { UpdateReservetionDto } from './dto/update-reservetion.dto';
import { ReservetionsRepository } from './reservetions.repository';

@Injectable()
export class ReservetionsService {
  constructor(private readonly reservetionsRepository: ReservetionsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy){

  }


  async create(createReservetionDto: CreateReservetionDto,userId :string) {
 return  this.paymentsService.send('create_charge', createReservetionDto.charge)
  .pipe(map( () =>{
    return this.reservetionsRepository.create(
      {...createReservetionDto,
         timestamp: new Date(),
         userId
    })
  }))
   
  }

  async findAll() {
    return this.reservetionsRepository.find({})
  }

 async findOne(_id: string) {
    return this.reservetionsRepository.findOne({_id})
  }

 async update(_id: string, updateReservetionDto: UpdateReservetionDto) {
    return this.reservetionsRepository.findOneAndUpdate(
      { _id },
      {$set:updateReservetionDto})
  }

 async remove(_id: string) {
    return this.reservetionsRepository.findOneAndDelete({_id})
  }
}
