import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DiscussionService } from './discussion.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { SharedService } from 'src/services/shared/shared.service';
import { BigIntService } from 'src/big-int-serializer-middleware/big-Int.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DiscussionGateway {
  @WebSocketServer()
  server: Server;

  constructor(private discussionService: DiscussionService,
    private messageService: MessageService,
    private sharedService : SharedService,
    private bigIntService : BigIntService) { }

  @SubscribeMessage('getUserDiscussions')
  async getUserDiscussions(@MessageBody() userIds: number[]) {
    userIds.forEach(async userId => {
      const discussions = await this.discussionService.getDiscussions(userId);
      
      // convertir les bigInt en string avant de l'envoyer au frontend
      const safeDiscussions = discussions.map( discus => {
        return this.bigIntService.serialize(discus)
      });

      this.server.to(userId.toString()).emit('discussion', safeDiscussions);
    });


  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.createMessage(createMessageDto);
    await this.discussionService.prisma.discussions.updateMany({
      where: { discussion_id: createMessageDto.discussion_id },
      data : {
        updated_at: this.sharedService.toLocalISOString(new Date())
      }
    })

    const discussion = await this.discussionService.prisma.discussions.findUnique({
      where: { discussion_id: createMessageDto.discussion_id },
      include: { discussion_user: true }
    })

    const idUsersDiscussion = discussion?.discussion_user.map(discussion_user => discussion_user.user_id.toString());

    this.server.to(idUsersDiscussion).emit('message', idUsersDiscussion);

  }

  @SubscribeMessage('createPrivateDiscussion')
  async createPrivateDiscussion(@MessageBody() createDiscussionDto: CreateDiscussionDto) {
    const discussion = await this.discussionService.createDiscussion(createDiscussionDto);
    this.server.emit('discussionCreated', discussion)
  }

  // attacher l'id d'user aux socket (pour l'authentification)
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    console.log(client.handshake.query);
    console.log('--------------------------------------------');

    client.join(userId);
  }



}