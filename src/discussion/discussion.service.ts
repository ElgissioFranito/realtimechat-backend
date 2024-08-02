import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscussionService {
    constructor(private prisma: PrismaService) { }

    async getDiscussions() {
        return this.prisma.discussion.findMany({
            include: { users: true, messages: true },
        });
    }

    async getDiscussionMessages(id: string) {
        return this.prisma.message.findMany({
            where: { discussion_id: parseInt(id) },
            // orderBy : { created_at : 'desc' }
        });
    }
}

