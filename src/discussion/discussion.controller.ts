import { Controller, Get, Param } from '@nestjs/common';
import { DiscussionService } from './discussion.service';

@Controller('discussion')
export class DiscussionController {

    constructor(private discussionsService: DiscussionService) { }

    @Get()
    getDiscussions() {
        return this.discussionsService.getDiscussions();
    }

    @Get(':id')
    getDiscussionMessages(@Param('id') id : string) {
        return this.discussionsService.getDiscussionMessages(id);
    }

}
