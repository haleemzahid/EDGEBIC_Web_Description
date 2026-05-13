import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';

import { AppInfo } from '@/constants/app-info';

export type PortalActivityEmailData = {
  recipient: string;
  recipientName?: string;
  subject: string;
  heading: string;
  preheader: string;
  context?: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
};

export const PortalActivityEmail = ({
  recipientName,
  heading,
  preheader,
  context,
  body,
  ctaLabel,
  ctaUrl
}: PortalActivityEmailData) => (
  <Html>
    <Head />
    <Preview>{preheader}</Preview>
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
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: 600,
              color: '#0f172a'
            }}
          >
            {recipientName ? `Hi ${recipientName},` : 'Hello,'}
          </Heading>
          <Text
            style={{
              margin: '0 0 16px 0',
              fontSize: '15px',
              fontWeight: 600,
              color: '#0f172a'
            }}
          >
            {heading}
          </Text>
          {context && (
            <Text
              style={{
                margin: '0 0 16px 0',
                fontSize: '13px',
                color: '#475569'
              }}
            >
              {context}
            </Text>
          )}
          <Section
            style={{
              backgroundColor: '#f8fafc',
              borderLeft: '3px solid #cbd5e1',
              padding: '12px 16px',
              borderRadius: '4px'
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#1e293b',
                whiteSpace: 'pre-wrap' as const
              }}
            >
              {body}
            </Text>
          </Section>
          <Section style={{ marginTop: '24px' }}>
            <Button
              href={ctaUrl}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              {ctaLabel}
            </Button>
          </Section>
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
