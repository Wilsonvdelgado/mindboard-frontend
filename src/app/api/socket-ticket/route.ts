import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json(
      { message: "API_URL não está definida." },
      { status: 500 },
    );
  }

  const accessToken = request.cookies.get("access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const response = await fetch(
    `${apiUrl.replace(/\/+$/, "")}/auth/socket-ticket`,
    {
      method: "POST",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
