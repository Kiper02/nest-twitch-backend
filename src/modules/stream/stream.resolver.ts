import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StreamService } from './stream.service';
import { StreamModel } from './models/stream.model';
import { FiltersInput } from './inputs/filters.input';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/client';
import * as Upload from 'graphql-upload/Upload.js';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { FileValidationPipe } from 'src/shared/pipes/file-validation.pipe';

@Resolver('Stream')
export class StreamResolver {
  public constructor(private readonly streamService: StreamService) {}

  @Query(() => [StreamModel], { name: 'findAllStreams' })
  public async findAll(
    @Args('filters') input: FiltersInput
  ) {
    return await this.streamService.findAll(input);
  }

  @Query(() => [StreamModel], { name: 'findRandomStreams' })
  public async findRandom() {
    return await this.streamService.findRandom();
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamInfo' })
  public async changeInfo(
    @Authorized() user: User,
    @Args('data') input: ChangeStreamInfoInput,
  ) {
    return await this.streamService.changeInfo(user, input);

  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeStreamThumbnail' })
  public async changeThumbnail(
    @Authorized() user: User,
    @Args('thumbnail', {type: () => GraphQLUpload}, FileValidationPipe) thumbnail: Upload
  ) {
    return await this.streamService.changeThumbnail(user, thumbnail);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeStreamThumbnail' })
  public async removeThumbnail(
    @Authorized() user: User,
  ) {
    return await this.streamService.removeThumbnail(user);
  }
}
