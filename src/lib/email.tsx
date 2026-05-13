import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { UpgradePromptEmail } from "@/emails/UpgradePromptEmail";

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.log(`[email] Skipping "${subject}" to ${to}; Resend not configured.`);
    return { skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

export async function sendWelcomeEmail(to: string, name?: string | null) {
  return sendEmail({
    to,
    subject: "Welcome to EarKit",
    html: WelcomeEmail(name),
  });
}

export async function sendUpgradePromptEmail(to: string, firstName?: string | null) {
  return sendEmail({
    to,
    subject: "Unlock unlimited daily drills",
    html: UpgradePromptEmail(firstName),
  });
}
