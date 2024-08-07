import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { DiscussionService } from './discussion.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DiscussionGateway {
  @WebSocketServer()
  server: Server;

  constructor(private discussionService: DiscussionService, private messageService : MessageService) { }

  // @SubscribeMessage('message')
  // findAll(@MessageBody() data: any): void {
  //   this.server.emit(data, data);
  // }

  @SubscribeMessage('getUserDiscussions')
  async getUserDiscussions(@MessageBody() userId: number) {
    const discussions = await this.discussionService.getDiscussions(userId);
    this.server.emit('discussion', discussions);
  }

  @SubscribeMessage ('createMessage') 
  async createMessage (@MessageBody() createMessageDto:CreateMessageDto) {
    const message = await this.messageService.createMessage(createMessageDto);
    const discussion = await this.discussionService.prisma.discussions.findUnique({
      where : { discussion_id : createMessageDto.discussion_id},
      include : { discussion_user : true }
    })

    discussion.discussion_user.forEach(user => {
      this.server.to(user.user_id.toString()).emit('message', 'message sent')
    });

  }

  @SubscribeMessage('createPrivateDiscussion')
  async createPrivateDiscussion (@MessageBody() createDiscussionDto : CreateDiscussionDto) {
    const discussion = await this.discussionService.createDiscussion(createDiscussionDto);
    this.server.emit('discussionCreated', discussion)
  }

  // attacher l'id d'user aux socket (pour l'authentification)
  handleConnection(client : Socket) {
    const userId = client.handshake.query.userId;
    console.log(client.handshake.query);
    console.log('--------------------------------------------');
    
    client.join(userId);
  }



}