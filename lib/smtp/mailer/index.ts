export type MailerPayload = {
  recipient: string;
  cc?: string | string[];
  subject: string;
  text: string;
  html: string;
};

export interface Mailer {
  sendEmail(payload: MailerPayload): Promise<unknown>;
}
