import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export enum ENotificationType {
  UPDATE = 'UPDATE',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export enum EEventType {
  CREATENOTIFCATION = 'createNotification',
  GETNOTIFICATION = 'getNotification',
}

export class NotificationDto {
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  type: ENotificationType;
}
