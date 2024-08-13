"use server"
// utils/sendgrid.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailData {
  to: any;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailData): Promise<void> {
    "use server"
  const msg = {
    to,
    from: 'contact@garagecomparet.fr',
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error) {
      console.error(error);
    }
  }
}