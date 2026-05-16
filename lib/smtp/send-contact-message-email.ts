import { render } from '@react-email/render';

import {
  ContactMessageEmail,
  type ContactMessageEmailData
} from '@/emails/contact-message-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

// cc/bcc are envelope-level and intentionally kept out of
// ContactMessageEmailData (they don't affect the rendered email body).
export type ContactMessageEnvelope = {
  cc?: string[];
  bcc?: string[];
};

export async function sendContactMessageEmail(
  data: ContactMessageEmailData,
  envelope?: ContactMessageEnvelope
): Promise<void> {
  const component = ContactMessageEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    ...(envelope?.cc && envelope.cc.length > 0 ? { cc: envelope.cc } : {}),
    ...(envelope?.bcc && envelope.bcc.length > 0
      ? { bcc: envelope.bcc }
      : {}),
    subject: data.subject,
    replyTo: data.senderEmail,
    html,
    text
  });
}
