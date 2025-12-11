"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const forgotPasswordSchema = z.object({
  email: z.email().min(1),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const router = useRouter();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleForgotPassword(data: ForgotPasswordForm) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/reset-password",
      },
      {
        onError: (error) => {
          toast.error(
            error.error.message || "Failed to send password reset email"
          );
        },
        onSuccess: () => {
          toast.success("Password reset email sent");
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 ">
      <Card className="w-full max-w-sm shadow-md px-4 pb-4">
        <CardHeader>
          <CardTitle className="text-center text-xl">Forgot Password</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleForgotPassword)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="Input ..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <LoadingSwap isLoading={isSubmitting}>
                  Send Reset Email
                </LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
