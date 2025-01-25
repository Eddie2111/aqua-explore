import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  create(createNotificationDto: NotificationDto) {
    console.log(createNotificationDto);
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }
}
