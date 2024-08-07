import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.users.findMany({
            include: {
                messages: true,
            }
        });
    }
}
