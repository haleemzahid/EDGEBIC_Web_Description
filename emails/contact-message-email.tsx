import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';

import { AppInfo } from '@/constants/app-info';
import {
  looksLikeHtml,
  sanitizeEmailHtml
} from '@/lib/email/sanitize-email-html';

export type ContactMessageEmailData = {
  recipient: string | string[];
  recipientName?: string;
  subject: string;
  body: string;
  senderName: string;
  senderEmail?: string;
  organizationName?: string;
};

export const ContactMessageEmail = ({
  recipientName,
  subject,
  body,
  senderName,
  senderEmail,
  organizationName
}: ContactMessageEmailData) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body
      style={{
        margin: 'auto',
        backgroundColor: '#f6f9fc',
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      <Container style={{ margin: '32px auto', maxWidth: '600px' }}>
        <Section
          style={{
            backgroundColor: '#ffffff',
            padding: '32px 40px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}
        >
          <Heading
            style={{
              margin: '0 0 16px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#0f172a'
            }}
          >
            {recipientName ? `Hi ${recipientName},` : 'Hello,'}
          </Heading>
          {looksLikeHtml(body) ? (
            <div
              style={{
                margin: 0,
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#1e293b'
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeEmailHtml(body) }}
            />
          ) : (
            <Text
              style={{
                margin: 0,
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#1e293b',
                whiteSpace: 'pre-wrap' as const
              }}
            >
              {body}
            </Text>
          )}
          <Text
            style={{
              marginTop: '32px',
              marginBottom: 0,
              fontSize: '14px',
              color: '#475569'
            }}
          >
            Best,
            <br />
            <strong style={{ color: '#0f172a' }}>{senderName}</strong>
            {senderEmail && (
              <>
                <br />
                <span style={{ color: '#64748b' }}>{senderEmail}</span>
              </>
            )}
            {organizationName && (
              <>
                <br />
                <span style={{ color: '#64748b' }}>{organizationName}</span>
              </>
            )}
          </Text>
        </Section>

        <Section style={{ marginTop: '20px', textAlign: 'center' as const }}>
          <Text style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
            Sent via {AppInfo.APP_NAME}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
