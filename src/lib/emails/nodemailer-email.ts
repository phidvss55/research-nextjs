// import { ServerClient } from "postmark";
import nodemailer from "nodemailer";

// const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

// export function sendEmail({
//   to,
//   subject,
//   html,
//   text,
// }: {
//   to: string;
//   subject: string;
//   html: string;
//   text: string;
// }) {
//   return postmarkClient.sendEmail({
//     From: process.env.POSTMARK_FROM_EMAIL!,
//     To: to,
//     Subject: subject,
//     HtmlBody: html,
//     TextBody: text,
//   });
// }

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false,
  // auth: {
  //   user: "maddison53@ethereal.email",
  //   pass: "jn7jnAPss4f63QBp6D",
  // },
  service: "gmail",
  auth: {
    user: "flysoft1000@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

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
  const info = await transporter.sendMail({
    from: "Better Auth",
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent:", info.messageId);
}
