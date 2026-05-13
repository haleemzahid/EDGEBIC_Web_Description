import { render } from '@react-email/render';

import {
  PortalActivityEmail,
  type PortalActivityEmailData
} from '@/emails/portal-activity-email';
import { sendEmail } from '@/lib/smtp/mailer/send-email';

export async function sendPortalActivityEmail(
  data: PortalActivityEmailData
): Promise<void> {
  const component = PortalActivityEmail(data);
  const html = await render(component);
  const text = await render(component, { plainText: true });

  await sendEmail({
    recipient: data.recipient,
    subject: data.subject,
    html,
    text
  });
}
