import { render } from '@react-email/render';

import {
  ContactMessageEmail,
  type ContactMessageEmailData
} from '@/emails/contact-message-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

export async function sendContactMessageEmail(
  data: ContactMessageEmailData
): Promise<void> {
  const component = ContactMessageEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    subject: data.subject,
    replyTo: data.senderEmail,
    html,
    text
  });
}
