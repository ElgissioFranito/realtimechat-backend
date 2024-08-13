import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(public prisma: PrismaService) { }

    async getDiscussions(userId: number) {

        const data = this.prisma.discussions.findMany({
            where: {
                discussion_user: {
                    some: {
                        user_id: userId
                    }
                }
            },
            include: {
                discussion_user: {
                    include: { users: true }
                },
                messages: {
                    take: 1,
                    orderBy : { updated_at : 'desc'}
                }
            },
            orderBy : {
                updated_at : 'desc'
            }
        });

        // Sérialisation manuelle des BigInt
        const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
            return typeof value === 'bigint' ? value.toString() : value;
        }));

        return data;
    }

    async getOne(discussionId: number) {

        const data = this.prisma.discussions.findUnique({
            where: {
                discussion_id: discussionId
            },
            include: {
                discussion_user: {
                    include: { users: true }
                },
            },
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

    async getDiscussionMessages(idDiscussion: number, page = 1, perPage = 15) {
        
        const skiped = (page - 1) * perPage;  // si page=2, skip les 1*perPage premiers elements
        const take = perPage;
        const [items, totalItems] = await this.prisma.$transaction([
            this.prisma.messages.findMany({
                where: { discussion_id: idDiscussion },
                skip : skiped,
                take : perPage,
                orderBy : { updated_at : 'desc'}
            }),
            this.prisma.messages.count({where : { discussion_id: idDiscussion }})
        ])

        return {
            data : items,
            perPage : perPage,
            total : totalItems,
            lastPage : Math.ceil(totalItems/perPage)
        }
    }
}

