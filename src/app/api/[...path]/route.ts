import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  if (path[0] !== "backend" || path.length < 2) {
    return NextResponse.json(
      { message: "Rota não encontrada." },
      { status: 404 },
    );
  }

  const apiPath = path.slice(1);
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const targetUrl = new URL(
    `${apiPath.map(encodeURIComponent).join("/")}${request.nextUrl.search}`,
    `${API_URL.replace(/\/+$/, "")}/`,
  );

  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  // O token é encaminhado apenas do servidor Next.js para o NestJS.
  headers.set("Cookie", `access_token=${token}`);

  const hasBody = !["GET", "HEAD"].includes(request.method);

  const apiResponse = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  const responseType = apiResponse.headers.get("content-type");

  if (responseType) {
    responseHeaders.set("Content-Type", responseType);
  }

  return new NextResponse(apiResponse.body, {
    status: apiResponse.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
