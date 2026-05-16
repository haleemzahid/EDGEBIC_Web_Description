export type MailerPayload = {
  recipient: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export interface Mailer {
  sendEmail(payload: MailerPayload): Promise<unknown>;
}
