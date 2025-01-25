import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';

import type { Server, Socket } from 'socket.io';
import { NotificationDto } from './dto/create-notification.dto';

export type TSocketEventMap = {
  [event: string]: (...args: unknown[]) => void;
};

export type TSocket = Socket<
  TSocketEventMap,
  TSocketEventMap,
  TSocketEventMap,
  unknown
> & {
  userId?: number;
};

@Injectable()
export abstract class AbstractWebsocketGateway
  implements OnModuleInit, OnModuleDestroy
{
  @WebSocketServer() protected readonly server!: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => this.processNewConnection(socket));
  }

  onModuleDestroy() {
    this.server.close();
  }

  abstract processNewConnection(socket: TSocket): void;

  abstract emitPayloadToRoom(
    room: string,
    event: string,
    payload: NotificationDto,
  ): void;

  abstract emitPayloadForEvent(event: string, payload: NotificationDto): void;
}
