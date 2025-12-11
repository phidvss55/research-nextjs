import z from "zod";

export const codeSchema = z.object({
  token: z
    .string()
    .regex(/^\d{6}$/, "Token must be exactly 6 digits")
    .transform((val) => Number(val)),
});

export type Verify2FAType = z.infer<typeof codeSchema>;
