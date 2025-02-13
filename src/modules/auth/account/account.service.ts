import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from './inputs/create-user.input';
import { hash, verify } from 'argon2';
import { VerificationService } from '../verification/verification.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { User } from '@prisma/client';
import { ChangePasswordInput } from './inputs/change-password.input';

@Injectable()
export class AccountService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly varificationService: VerificationService,
  ) {}

  public async me(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        socialLinks: true
      }
    });
    return user;
  }

  public async create(input: CreateUserInput) {
    const { username, password, email } = input;

    const isUsernameExist = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist) {
      throw new ConflictException('Это имя пользователя уже занято');
    }

    const isEmailExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Эта почта уже занята');
    }

    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: await hash(password),
        displayName: username,
      },
    });

    await this.varificationService.sendVerificationToken(user);
    return true;
  }

  public async changeEmail(user: User, input: ChangeEmailInput) {
    const { email } = input;

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
      },
    });

    return true;
  }

  public async changePassword(user: User, input: ChangePasswordInput) {
    const { oldPassword, newPassword } = input;

    const isValidPassword = await verify(user.password, oldPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный старый пароль');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hash(newPassword),
      },
    });

    return true;
  }
}
