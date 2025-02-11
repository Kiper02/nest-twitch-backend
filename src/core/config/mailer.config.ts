import type { MailerOptions } from "@nestjs-modules/mailer";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { isDev } from "src/shared/utils/is-dev.util";

export function getMailerConfig(configService: ConfigService): MailerOptions {
    return {
        transport: {
            host: configService.getOrThrow<string>('MAIL_HOST'),
            port: configService.getOrThrow<number>('MAIL_PORT'),
            secure: true,
            auth: {
                user: configService.getOrThrow<string>('MAIL_LOGIN'),
                pass: configService.getOrThrow<string>('MAIL_PASSWORD')
            }
        },
        defaults: {
            from: `"Twitch" ${configService.getOrThrow<string>('MAIL_LOGIN')}`
        }
    }
}