import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe'
@Injectable()
export class PaymentsService {
  constructor( private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService : ClientProxy
    ){

  }
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY') ,{
    apiVersion:"2023-10-16"
  } )

  async createCharge({amount}:CreateChargeDto){

    const paymentIntent = await this.stripe.paymentIntents.create({

      amount: amount*100,
      confirm:true,
      payment_method:'pm_card_visa',
      currency:'ron',
      return_url:'htpps://mstar.shop.ro'
    })


    return paymentIntent
  }
  
}
