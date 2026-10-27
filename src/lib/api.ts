export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const API = {
  login: "/auth/login",
  boards: "/boards",
};

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está definida.");
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const url = `/api/backend/${path.replace(/^\//, "")}`;

  console.log("apiFetch", url, options);

  const response = await fetch(url, {
    ...options,
    // credentials: "include",
    credentials: "same-origin",

    headers: {
      ...(options.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!response.ok) {
    const dataError = await response.json().catch(() => null);
    throw new Error(dataError.message || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
