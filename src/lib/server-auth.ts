import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { User } from "./auth";

export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  console.log("get cookie in getAuthenticatedUser");
  if (!token) {
    return null;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida.");
  }

  const response = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: `access_token=${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Não foi possível validar a sessão.");
  }

  return response.json() as Promise<User>;
}

export async function requireUser(): Promise<User> {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();

  if (user.role !== "admin") {
    redirect("/boards");
  }

  return user;
}
