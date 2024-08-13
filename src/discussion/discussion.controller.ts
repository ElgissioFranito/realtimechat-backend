import { Controller, Get, Param } from '@nestjs/common';
import { DiscussionService } from './discussion.service';

@Controller('discussion')
export class DiscussionController {

    constructor(private discussionsService: DiscussionService) { }

    @Get(':id')
    getDiscussions(@Param('id') userId : string) {
        return this.discussionsService.getDiscussions(parseInt(userId));
    }

    @Get('getOne/:id')
    getOne(@Param('id') userId : string) {
        return this.discussionsService.getOne(parseInt(userId));
    }

    @Get('message/:id')
    getDiscussionMessages(@Param('id') idDiscussion : string) {
        return this.discussionsService.getDiscussionMessages(parseInt(idDiscussion));
    }

}
