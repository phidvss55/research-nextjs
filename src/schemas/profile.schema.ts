import z from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required").readonly(),
});

export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>;
