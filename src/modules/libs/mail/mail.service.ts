import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import VerificationTemplate from './templates/verification.template';
import PasswordRecoveryTemplate from './templates/password-recovery.template';
import type { SessionMetaData } from 'src/shared/types/session-metadata.types';
import DeactiveTemplate from './templates/deactive.template';
import AccountDeletionTemplate from './templates/account-deletion.template';

@Injectable()
export class MailService {
    public constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    public async sendVerificationToken(email: string, token: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(VerificationTemplate({domain, token}))
        return this.sendMail(email, 'Верификация аккаунта', html);
    }

    public async sendPasswordResetToken(email: string, token: string, metadata: SessionMetaData) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(PasswordRecoveryTemplate({domain, token, metadata}))
        return this.sendMail(email, 'Сброс пароля', html);
    }

    public async sendDeactiveToken(email: string, token: string, metadata: SessionMetaData) {
        const html = await render(DeactiveTemplate({token, metadata}))
        return this.sendMail(email, 'Деактивация аккаунта', html);
    }

    public async sendAccountDeletion(email: string) {
        const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
        const html = await render(AccountDeletionTemplate({domain}))
        return this.sendMail(email, 'Аккаунт удалён', html);
    }

    private sendMail(email: string, subject: string, html: string) {
        return this.mailerService.sendMail({
            to: email,
            subject: subject,
            html: html
        })
    }
}

