import { Module } from '@nestjs/common';
import { DeactiveService } from './deactive.service';
import { DeactiveResolver } from './deactive.resolver';

@Module({
  providers: [DeactiveResolver, DeactiveService],
})
export class DeactiveModule {}
