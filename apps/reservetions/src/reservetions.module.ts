import { Module } from '@nestjs/common';
import { ReservetionsService } from './reservetions.service';
import { ReservetionsController } from './reservetions.controller';
import { DatabaseModule, LoggerModule,AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common';
import { ReservetionsRepository } from './reservetions.repository';
import { ReservetionDocument, ReservetionSchema } from './models/reservetion.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[DatabaseModule, DatabaseModule.forFeature([{ name:ReservetionDocument.name, schema: ReservetionSchema}]),LoggerModule,
   ConfigModule.forRoot({
    isGlobal:true,
    validationSchema:Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
      AUTH_HOST:Joi.string().required(),
      PAYMENTS_HOST:Joi.string().required(),
      AUTH_PORT:Joi.number().required(),
      PAYMENTS_PORT:Joi.number().required(),
    })
   }),
  ClientsModule.registerAsync([
    {
      name: AUTH_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get('AUTH_HOST'),
          port: configService.get('AUTH_PORT'),
        },
      }),
      inject: [ConfigService],
    },
    {
      name: PAYMENTS_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get('PAYMENTS_HOST'),
          port: configService.get('PAYMENTS_PORT'),
        },
      }),
      inject: [ConfigService],
    },
  ])
],
  controllers: [ReservetionsController],
  providers: [ReservetionsService, ReservetionsRepository]
})
export class ReservetionsModule {}
