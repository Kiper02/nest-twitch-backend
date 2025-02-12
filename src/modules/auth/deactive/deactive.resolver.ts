import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { DeactiveService } from './deactive.service';
import { GqlContext } from 'src/shared/types/gql-context.types';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import type { User } from '@prisma/client';
import { AuthModel } from '../account/models/auth.model';
import { Authorization } from 'src/shared/decorators/auth.decorator';

@Resolver('Deactive')
export class DeactiveResolver {
  public constructor(private readonly deactiveService: DeactiveService) {}


  @Authorization()
  @Mutation(() => AuthModel, {name: 'deactivateAccount'})
  public async deactivate(
    @Context() {req}: GqlContext,
    @Args('data') input: DeactivateAccountInput,
    @Authorized() user: User,
    @UserAgent() userAgent: string
  ) {
    return await this.deactiveService.deactivate(req, input, user, userAgent);
  }

  
}
