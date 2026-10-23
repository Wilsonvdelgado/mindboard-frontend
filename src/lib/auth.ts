import { IFormChangePassword } from "../app/(private)/profile/types";
import { apiFetch } from "./api";

export type LoginInput = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

export type LoginResponse = {
  user: User;
};

export function loginRequest(data: LoginInput) {
  return apiFetch<LoginResponse>("auth/login", {
    method: "POST",
    body: data,
  });
}

export function logoutRequest() {
  return apiFetch<void>("auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiFetch<User>("auth/me", {
    method: "GET",
    cache: "no-store",
  });
}

export function changePassword(data: IFormChangePassword) {
  return apiFetch<void>("auth/change-password", {
    method: "POST",
    body: data,
  });
}
