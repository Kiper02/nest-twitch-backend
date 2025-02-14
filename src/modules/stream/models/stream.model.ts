import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { Stream } from '@prisma/client';
import { UserModel } from 'src/modules/auth/account/models/user.model';

@ObjectType()
export class StreamModel implements Stream {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public title: string;

  @Field(() => String, {nullable: true})
  public thumbnailUrl: string;

  @Field(() => String, {nullable: true})
  public serverUrl: string;

  @Field(() => String, {nullable: true})
  public streamKey: string;

  @Field(() => String, {nullable: true})
  public ingressId: string;

  @Field(() => Boolean)
  public isLive: boolean;

  @Field(() => UserModel)
  public user: UserModel;

  @Field(() => String)
  public userId: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
