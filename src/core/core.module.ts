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
    PrismaModule,
    SessionModule,
    RedisModule,
    AccountModule,
    VerificationModule,
    MailModule,
    PasswordRecoveryModule,
    TotpModule,
    DeactiveModule,
  ],
})
export class CoreModule {}
