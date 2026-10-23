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
