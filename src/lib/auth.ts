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
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { STRIPE_PLANS } from "@/constants/stripe";
import { desc, eq } from "drizzle-orm";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover", // Latest API version as of Stripe SDK v20.0.0
});

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
  plugins: [
    nextCookies(),
    passkey(),
    twoFactor(),
    // stripe({
    //   stripeClient,
    //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    //   createCustomerOnSignUp: true,
    // subscription: {
    //   authorizeReference: async ({ user, referenceId, action }) => {
    //     const memberItem = await db.query.member.findFirst({
    //       where: and(
    //         eq(member.organizationId, referenceId),
    //         eq(member.userId, user.id)
    //       ),
    //     });

    //     if (
    //       action === "upgrade-subscription" ||
    //       action === "cancel-subscription" ||
    //       action === "restore-subscription"
    //     ) {
    //       return memberItem?.role === "owner";
    //     }
    //     return memberItem != null;
    //   },
    //   enabled: true,
    //   plans: STRIPE_PLANS,
    // },
    // }),
  ],
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
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // mapProfileToUser: (profile) => {
      //   return {
      //     favoriteNumber: Number(profile.public_repos) || 0,
      //   };
      // },
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      // mapProfileToUser: () => {
      //   return {
      //     // favoriteNumber: 0,
      //   };
      // },
    },
  },
  // databaseHooks: {
  //   session: {
  //     create: {
  //       before: async (userSession) => {
  //         const membership = await db.query.member.findFirst({
  //           where: eq(member.userId, userSession.userId),
  //           orderBy: desc(member.createdAt),
  //           columns: { organizationId: true },
  //         });

  //         return {
  //           data: {
  //             ...userSession,
  //             activeOrganizationId: membership?.organizationId,
  //           },
  //         };
  //       },
  //     },
  //   },
  // },
});

export const getUserSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
