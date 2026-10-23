import { IFormCreate, IUser } from "../app/(private)/users/types";
import { CreatePasswordSchema } from "../app/(public)/(user-config)/verify-acount/types";
import { apiFetch } from "./api";

export function loadUsers() {
  return apiFetch<IUser[]>("users", {
    method: "GET",
  });
}

export function deleteUser(id: number) {
  return apiFetch<void>(`users/${id}`, {
    method: "DELETE",
  });
}

export function createUser(user: IFormCreate) {
  return apiFetch<void>("users", {
    method: "POST",
    body: user,
  });
}

export function updateUser(id: number, user: IFormCreate) {
  return apiFetch<void>(`users/${id}`, {
    method: "PUT",
    body: user,
  });
}

export function verifyUserAcount(token: string) {
  return apiFetch<Partial<IUser>>("users/verify/" + token, {
    method: "GET",
  });
}

export function verifyUserCreatePassword(
  token: string,
  data: CreatePasswordSchema & { token: string },
) {
  return apiFetch<Partial<IUser>>("users/verify/" + token, {
    method: "GET",
  });
}
