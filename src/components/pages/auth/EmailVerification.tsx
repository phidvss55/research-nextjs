"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";

export function EmailVerification({ email }: { email: string }) {
  const [timeToNextResend, setTimeToNextResend] = useState(30);
  const interval = useRef<NodeJS.Timeout>(undefined);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);

    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mt-2 mx-4">
        We sent you a verification link. Please check your email and click the
        link to verify your account.
      </p>

      <BetterAuthActionButton
        variant="default"
        className="mx-4 "
        successMessage="Verification email sent!"
        disabled={timeToNextResend > 0}
        action={() => {
          startEmailVerificationCountdown();
          return authClient.sendVerificationEmail({
            email,
            callbackURL: "/",
          });
        }}
      >
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </BetterAuthActionButton>
    </div>
  );
}
