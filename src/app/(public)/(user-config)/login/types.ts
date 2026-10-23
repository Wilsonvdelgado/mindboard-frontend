import z from "zod";

export const formLoginSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export type LoginSchema = z.infer<typeof formLoginSchema>;
