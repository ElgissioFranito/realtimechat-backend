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

@Module({
  imports: [],
  controllers: [AppController, UserController, DiscussionController, MessageController],
  providers: [AppService, PrismaService, UserService, DiscussionService, MessageService, DiscussionGateway],
})
export class AppModule {}
