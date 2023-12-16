import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}


    // vrem sa primi un event dintr-un serviciu extern si nu vrem sa trimitem un raspuns inapoi
    // e mai simplu pentru ca doar notificam userii

    @UsePipes( new ValidationPipe())
    @EventPattern('notify_email')
      async notifyEmail(@Payload() data : NotifyEmailDto){
        this.notificationsService.notifyEmail(data)
      }
    
}
