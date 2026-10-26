import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiResponse = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await apiResponse.json();

    const response = NextResponse.json(data, {
      status: apiResponse.status,
    });

    // Encaminhar os cookies do NestJS para o browser
    const cookies = apiResponse.headers.getSetCookie();

    for (const cookie of cookies) {
      // O cookie deve pertencer ao domínio do frontend.
      const frontendCookie = cookie
        .replace(/;\s*Domain=[^;]*/i, "")
        .replace(/;\s*SameSite=None/i, "; SameSite=Lax");

      response.headers.append("Set-Cookie", frontendCookie);
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: "Erro ao contactar o servidor de autenticação." },
      { status: 502 },
    );
  }
}
