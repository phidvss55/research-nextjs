"use client";

import { useAuth } from "@/components/context/AuthProvider";
import { Button } from "@/components/ui/button";
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
import {
  profileUpdateSchema,
  ProfileUpdateType,
} from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateProfile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const { isSubmitting } = form.formState;

  async function handleProfileUpdate(data: ProfileUpdateType) {
    const promises = [
      authClient.updateUser({
        name: data.name,
      }),
    ];

    if (data.email !== user?.email) {
      promises.push(
        authClient.changeEmail({
          newEmail: data.email,
          callbackURL: "/profile",
        })
      );
    }

    const res = await Promise.all(promises);

    const updateUserResult = res[0];
    const emailResult = res[1] ?? { error: false };

    if (updateUserResult.error) {
      toast.error(updateUserResult.error.message || "Failed to update profile");
    } else if (emailResult.error) {
      toast.error(emailResult.error.message || "Failed to change email");
    } else {
      if (data.email !== user?.email) {
        toast.success("Verify your new email address to complete the change.");
      } else {
        toast.success("Profile updated successfully");
      }
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        className="bg-white rounded-xl shadow p-6 space-y-6"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input type="email" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Button */}
        <div className="pt-4">
          <Button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            disabled={isSubmitting}
          >
            <LoadingSwap isLoading={isSubmitting}>Update Profile</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProfile;
