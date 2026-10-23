import type { IUserRole } from "../Users/types";
import { z } from "zod";

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: IUserRole;
}

const requiredMessage = "Campo obrigatório";

export const formChangePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty(requiredMessage),
    newPassword: z.string().nonempty(requiredMessage),
    confirmPassword: z.string().nonempty(requiredMessage),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As palavras-passe não são iguais",
    path: ["confirmPassword"], // erro aparece no campo confirm
  });

export type IFormChangePassword = z.infer<typeof formChangePasswordSchema>;
