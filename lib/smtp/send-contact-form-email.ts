import { render } from '@react-email/render';

import {
  ContactFormEmail,
  type ContactFormEmailData
} from '@/emails/contact-form-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

export async function sendContactFormEmail(
  data: ContactFormEmailData & { cc?: string | string[] }
): Promise<void> {
  const component = ContactFormEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    cc: data.cc,
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html,
    text
  });
}
