import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { AbstractWebsocketGateway, TSocket } from "./abstract.gateway";
import { EEventType, NotificationDto } from "./dto/create-notification.dto";

@WebSocketGateway(5001, {
  cors: {
    origin: '*',
  },
  path: "/",
  transports: ['websocket', 'polling'],
})
export class NotificationGateway extends AbstractWebsocketGateway {
  constructor(
  ) {
    super();
  }

  private userIdToSocketMap: Map<number, TSocket> = new Map();

  onModuleInit(): void {
    super.onModuleInit();

    this.server.use((socket: TSocket, next) => {
        socket; // eslint-disable-line @typescript-eslint/no-unused-vars
        return next();
    });
  }

  processNewConnection(socket: TSocket): void {
    const userId = socket.userId;

    if (userId) {
      this.userIdToSocketMap.set(userId, socket);
    }
  }

  emitPayloadToRoom<TPayload>(room: string, event: string, payload: TPayload): void {
    this.server.to(room).emit(event, payload);
  }

  emitPayloadForEvent<TPayload>(event: string, payload: TPayload): void {
    this.server.emit(event, payload);
  }

  @SubscribeMessage(EEventType.CREATENOTIFCATION)
  handleCreate(@MessageBody() payload: NotificationDto, @ConnectedSocket() socket: TSocket): void {
    const parsedPayload = { ...payload, sender: socket.userId as number };
    this.emitPayloadForEvent( EEventType.GETNOTIFICATION, parsedPayload);
  }
}