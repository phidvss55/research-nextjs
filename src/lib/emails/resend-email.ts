import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<any> {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html,
    text,
  });

  if (error) {
    return console.error({ error });
  }

  console.log("Message sent:::", data);
}
