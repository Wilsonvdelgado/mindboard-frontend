import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiResponse = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(data, {
        status: apiResponse.status,
      });
    }

    // O NestJS deve devolver o token no cookie.
    const setCookies = apiResponse.headers.getSetCookie();
    const authCookie = setCookies.find((cookie) =>
      cookie.startsWith("access_token="),
    );

    if (!authCookie) {
      console.error("O NestJS não devolveu o cookie access_token.");

      return NextResponse.json(
        { message: "Cookie de autenticação não recebido." },
        { status: 502 },
      );
    }

    const token = authCookie.match(/^access_token=([^;]*)/)?.[1];

    console.log("token after login", token);
    if (!token) {
      return NextResponse.json(
        { message: "Cookie de autenticação inválido." },
        { status: 502 },
      );
    }

    const response = NextResponse.json(data);

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      { message: "Erro ao contactar o servidor de autenticação." },
      { status: 502 },
    );
  }
}
