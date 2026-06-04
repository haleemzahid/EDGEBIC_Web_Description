import { render } from '@react-email/render';

import {
  PasswordResetCodeEmail,
  type PasswordResetCodeEmailData
} from '@/emails/password-reset-code-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

export async function sendPasswordResetCodeEmail(
  data: PasswordResetCodeEmailData
): Promise<void> {
  const component = PasswordResetCodeEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    subject: 'Your password reset code',
    html,
    text
  });
}
