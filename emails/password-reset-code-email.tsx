import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { AppInfo } from '@/constants/app-info';

export type PasswordResetCodeEmailData = {
  recipient: string;
  name: string;
  code: string;
  expiresInMinutes: number;
};

export const PasswordResetCodeEmail = ({
  name,
  code,
  expiresInMinutes
}: PasswordResetCodeEmailData) => (
  <Html>
    <Head />
    <Preview>
      {`Your ${AppInfo.APP_NAME} password reset code is ${code}`}
    </Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Password reset code
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Hello {name},
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Use the code below to reset your {AppInfo.APP_NAME} password. The
            code expires in {expiresInMinutes} minutes.
          </Text>
          <Section className="my-[32px] text-center">
            <Text className="inline-block rounded bg-[#f4f4f5] px-6 py-3 text-center text-[32px] font-bold tracking-[10px] text-black">
              {code}
            </Text>
          </Section>
          <Text className="text-[14px] leading-[24px] text-black">
            Enter this code in the app to continue. For your security, never
            share it with anyone — {AppInfo.COMPANY_NAME} staff will never ask
            you for it.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            If you didn&apos;t request a password reset, you can safely ignore
            and delete this message — your password will not be changed.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
