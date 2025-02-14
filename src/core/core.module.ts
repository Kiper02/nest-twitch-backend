import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from 'src/shared/utils/is-dev.util';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphQlConfig } from './config/graphql.config';
import { RedisModule } from './redis/redis.module';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { VerificationModule } from 'src/modules/auth/verification/verification.module';
import { MailModule } from 'src/modules/libs/mail/mail.module';
import { PasswordRecoveryModule } from 'src/modules/auth/password-recovery/password-recovery.module';
import { TotpModule } from 'src/modules/auth/totp/totp.module';
import { DeactiveModule } from 'src/modules/auth/deactive/deactive.module';
import { CronModule } from 'src/modules/cron/cron.module';
import { StorageModule } from 'src/modules/libs/storage/storage.module';
import { ProfileModule } from 'src/modules/auth/profile/profile.module';
import { StreamModule } from 'src/modules/stream/stream.module';
import { LivekitModule } from 'src/modules/libs/livekit/livekit.module';
import { getLiveKitConfig } from './config/livekit.config';
import { IngressModule } from 'src/modules/stream/ingress/ingress.module';
import { WebhookModule } from 'src/modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQlConfig,
      inject: [ConfigService],
    }),
    LivekitModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getLiveKitConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    CronModule,
    SessionModule,
    StorageModule,
    LivekitModule,
    IngressModule,
    WebhookModule,
    RedisModule,
    AccountModule,
    ProfileModule,
    VerificationModule,
    MailModule,
    PasswordRecoveryModule,
    TotpModule,
    DeactiveModule,
    StreamModule,
  ],
})
export class CoreModule {}
