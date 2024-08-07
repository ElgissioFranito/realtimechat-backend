import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(public prisma: PrismaService) { }

    async getDiscussions(userId: number) {
        console.log("userId " +userId);
        
        const data = this.prisma.discussions.findMany({
            where: {
                discussion_user: {
                    some: {
                        user_id: userId
                    }
                }
            },
            include: { discussion_user: { include: { users: true } }, messages: true }
        });

        // Sérialisation manuelle des BigInt
        const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
            return typeof value === 'bigint' ? value.toString() : value;
        }));
        
        return data;
    }

    // Création d'une discussion
    async createDiscussion(createDiscussionDto: CreateDiscussionDto) {
        const discussion = await this.prisma.discussions.create({
            data: {
                discussion_name: createDiscussionDto?.discussion_name ?? null,
                discussion_user: {
                    create: createDiscussionDto.userIds.map(userId => ({
                        users: {
                            connect: { id: userId }
                        }
                    }))
                }
            }
        })
        return discussion;
    }

    async getDiscussionMessages(id: number) {
        return this.prisma.messages.findMany({
            where: { discussion_id: id },
            // orderBy : { created_at : 'desc' }
        });
    }
}

