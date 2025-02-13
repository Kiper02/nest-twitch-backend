import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './models/user.model';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { ChangeEmailInput } from './inputs/change-email.input';
import { User } from '@prisma/client';
import { ChangePasswordInput } from './inputs/change-password.input';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, { name: 'findProfile' })
  public async me(@Authorized('id') id: string) {
    return this.accountService.me(id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  public async create(@Args('data') input: CreateUserInput) {
    return await this.accountService.create(input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeEmail' })
  public async changeEmail(
    @Args('data') input: ChangeEmailInput,
    @Authorized() user: User
  ) {
    return await this.accountService.changeEmail(user, input)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changePassword' })
  public async changePassword(
    @Args('data') input: ChangePasswordInput,
    @Authorized() user: User
  ) {
    return await this.accountService.changePassword(user, input)
  }
}
