interface EmailTemplate {
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

export async function sendInstallerEmail(
  customerEmail: string,
  customerName: string
): Promise<boolean> {
  const emailTemplate: EmailTemplate = {
    to: customerEmail,
    subject: 'Your Edgebi Installer is Ready!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f97316;">Welcome to NTClipboard!</h1>
        <p>Hi ${customerName},</p>
        <p>Thank you for purchasing NTClipboard! Your installer is ready for download.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>What's included:</h3>
          <ul>
            <li>✅ Complete Edgebi Desktop Application</li>
            <li>✅ Smart PDF Data Extraction</li>
            <li>✅ Windows Clipboard Integration</li>
            <li>✅ Lifetime Updates</li>
            <li>✅ Email Support</li>
          </ul>
        </div>
        
        <a href="https://your-domain.com/download?token=SECURE_TOKEN" 
           style="background: linear-gradient(135deg, #f97316, #dc2626); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
          Download Edgebi Now
        </a>
        
        <p style="margin-top: 30px;">
          <strong>System Requirements:</strong><br>
          Windows 10 or later<br>
          .NET 8.0 Runtime (included in installer)
        </p>
        
        <p>Need help? Reply to this email or contact us at support@ntclipboard.com</p>
        
        <p>Best regards,<br>The Edgebi Team</p>
      </div>
    `
  };

  // Replace with your email service (SendGrid, Mailgun, etc.)
  try {
    // Example with fetch to your email API endpoint
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailTemplate)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send installer email:', error);
    return false;
  }
}
