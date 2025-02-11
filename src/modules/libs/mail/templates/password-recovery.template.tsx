import {
    Body,
    Head,
    Heading,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';
  import { Html } from '@react-email/html';
  import * as React from 'react';
import type { SessionMetaData } from 'src/shared/types/session-metadata.types';
  
  interface PasswordRecoveryTemplateProps {
    domain: string;
    token: string;
    metadata: SessionMetaData
  }
  
  export default function PasswordRecoveryTemplate({
    domain,
    token,
    metadata
  }: PasswordRecoveryTemplateProps) {
    const verificationLink = `${domain}/account/recovery/${token}`;
    return (
      <Html>
        <Head />
        <Preview>Сброс пароля</Preview>
        <Tailwind>
          <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
            <Section className="text-center mb-8">
              <Heading className="text-3xl text-black font-bold">
                Сброс пароля
              </Heading>
              <Text className="text-base text-black mt-2">
                Вы запросили сброс пароля для вашей учетной записи.
              </Text>
              <Text className="text-base text-black mt-2">
                Что бы создать новый пароль, нажмите на ссылку ниже:
              </Text>
              <Link
                href={verificationLink}
                className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white
                bg-[#18B9AE] px-5 py-2"
              >
                Сбросить пароль
              </Link>
            </Section>
        
            <Section className="bg-gray-100 rounded-lg p-6 mb-6">
                <Heading className="text-xl font-semibold text-[#18B9AE]">
                    Информация о запросе:
                </Heading>
                <ul className="list-desc list-inside mt-2 text-black">
                        <li>📍 Расположение: {metadata.location.country}</li>
                        <li>📱 Операционная система: {metadata.device.os}</li>
                        <li>🌐 Браузер: {metadata.device.browser}</li>
                        <li>🖥️ IP-адресс: {metadata.ip}</li>
                </ul>

                <Text className="text-gray-600 mt-2">
                    Если вы не инициировали этот запрос, пожайлуйста, игнорируйте это сообщение.
                </Text>
            </Section>

            <Section className="text-center mt-8">
              <Text className="text-gray-600">
                Если у вас есть вопросы или вы столкнулись с трудностям, не
                стесняйтесь обращаться в нашу службу поддержки по адресу{' '}
                <Link
                  href="mailto:twitch-2026@mail.ru"
                  className="text-[#18B9AE] underline"
                >
                  help@twitch.ru
                </Link>
              </Text>
            </Section>
          </Body>
        </Tailwind>
      </Html>
    );
  }
  