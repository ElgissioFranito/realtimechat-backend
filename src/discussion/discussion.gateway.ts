import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DiscussionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  findAll(@MessageBody() data: any): void {
    this.server.emit('rakoto', data);
  }

}