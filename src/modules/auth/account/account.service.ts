import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from './inputs/create-user.input';
import { hash } from 'argon2'
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AccountService {
    public constructor(private readonly prismaService: PrismaService, private readonly varificationService: VerificationService) {}

    public async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    public async create(input: CreateUserInput) {
        const { username, password, email } = input

        const isUsernameExist = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if(isUsernameExist) {
            throw new ConflictException('Это имя пользователя уже занято')
        }

        const isEmailExist = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if(isEmailExist) {
            throw new ConflictException('Эта почта уже занята')
        }
        
        const user = await this.prismaService.user.create({
            data: {
                username,
                email, 
                password: await hash(password),
                displayName: username
            }
        })

        await this.varificationService.sendVerificationToken(user);
        return true;
    }
}
