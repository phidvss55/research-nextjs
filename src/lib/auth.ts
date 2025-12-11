import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { sendDeleteAccountVerificationEmail } from "./emails/delete-accounts";
import { sendEmailVerificationEmail } from "./emails/email-verification";
import { sendPasswordResetEmail } from "./emails/password-reset";
import { createAuthMiddleware } from "better-auth/api";
import { sendWelcomeEmail } from "./emails/welcome";
import { passkey } from "@better-auth/passkey";
import { twoFactor } from "better-auth/plugins/two-factor";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 5,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ user, url });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerificationEmail({ user, url });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        await sendEmailVerificationEmail({
          user: { ...user, email: newEmail },
          url,
        });
      },
    },
    additionalFields: {
      twoFactorEnabled: {
        type: "boolean",
        input: false,
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteAccountVerificationEmail({ user, url });
      },
    },
  },
  session: {
    // expiresIn: 60 * 5, // 5 minute
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minute
    },
  },
  plugins: [nextCookies(), passkey(), twoFactor()],
  // rateLimit: {
  //   storage: "database",
  // },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const user = ctx.context.newSession?.user ?? {
          name: ctx.body.name,
          email: ctx.body.email,
        };

        if (user != null) {
          await sendWelcomeEmail(user);
        }
      }
    }),
  },
});

export const getUserSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
