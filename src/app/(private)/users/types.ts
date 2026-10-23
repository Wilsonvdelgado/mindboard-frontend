import { z } from "zod";

const requiredMessage = "Campo obrigatório";

export const formCreateSchema = z.object({
  name: z.string().nonempty(requiredMessage),
  email: z.email("Email inválido").nonempty(requiredMessage),
  role: z.string().nonempty(requiredMessage),
});

export type IFormCreate = z.infer<typeof formCreateSchema>;

export type IUserRole = "admin" | "user";
export const UserRole = {
  admin: "admin",
  user: "user",
};

export const UserStatus = {
  active: "active",
  pending: "pending",
  deleted: "deleted",
};

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: IUserRole;
  status: UserStatusType;
}
