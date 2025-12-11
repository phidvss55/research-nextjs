"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import { SignUpForm, signUpSchema } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EmailVerification } from "./EmailVerification";

const SignupForm = () => {
  const [show, setShow] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function handleSignUp(data: SignUpForm) {
    const res = await authClient.signUp.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign up");
        },
      }
    );

    if (res.error == null && !res.data.user.emailVerified) {
      setShow(true);
    }
  }

  const email = form.watch("email");

  const renderForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Input ..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Input ..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="underline hover:text-primary">
                Login
              </a>
            </p>
          </CardFooter>
        </form>
      </Form>
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Create Account
            </CardTitle>
          </CardHeader>

          {show && <EmailVerification email={email} />}

          {!show && renderForm()}
        </Card>
      </div>
    </>
  );
};

export default SignupForm;
