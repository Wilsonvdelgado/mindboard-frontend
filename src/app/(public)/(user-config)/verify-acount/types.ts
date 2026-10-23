import z from "zod";
const requiredMessage = "Campo obrigatório";

export const formSchema = z
  .object({
    password: z.string().nonempty(requiredMessage),
    confirm: z.string().nonempty(requiredMessage),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As palavras-passe não são iguais",
    path: ["confirm"], // erro aparece no campo confirm
  });

export type CreatePasswordSchema = z.infer<typeof formSchema>;
