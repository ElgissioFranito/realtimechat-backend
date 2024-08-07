import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }

    @Post()
    getDiscussions(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.createMessage(createMessageDto);
    }
    
}
