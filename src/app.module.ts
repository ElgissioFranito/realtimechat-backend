import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { DiscussionService } from './discussion/discussion.service';
import { MessageService } from './message/message.service';
import { DiscussionGateway } from './discussion/discussion.gateway';
import { DiscussionController } from './discussion/discussion.controller';
import { MessageController } from './message/message.controller';
import { SharedService } from './services/shared/shared.service';
import { BigIntService } from './big-int-serializer-middleware/big-Int.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, DiscussionController, MessageController],
  providers: [AppService, PrismaService, UserService, DiscussionService, MessageService, DiscussionGateway, SharedService, BigIntService],
})
export class AppModule {}
