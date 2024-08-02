import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) { }
    
    async createMessage(createMessageDto: CreateMessageDto) {
        return this.prisma.message.create({
            data: createMessageDto,
        });
    }
}
