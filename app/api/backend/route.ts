import { NextResponse } from "next/server";

const baseUrl =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000/api";

async function readResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text || null;
  }
}

function buildHeaders(token?: string, isJson = true) {
  const headers: Record<string, string> = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const endpoint = String(formData.get("endpoint") ?? "");
      const token = String(formData.get("token") ?? "");
      const upstreamForm = new FormData();

      formData.forEach((value, key) => {
        if (key !== "endpoint" && key !== "token" && value !== "") {
          upstreamForm.append(key, value);
        }
      });

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: buildHeaders(token, false),
        body: upstreamForm,
      });

      return NextResponse.json({
        ok: response.ok,
        status: response.status,
        data: await readResponse(response),
      });
    }

    const body = await request.json();
    const response = await fetch(`${baseUrl}${body.endpoint}`, {
      method: "POST",
      headers: buildHeaders(body.token),
      body: JSON.stringify(body.payload ?? {}),
    });

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      data: await readResponse(response),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: 500,
        data: {
          message:
            error instanceof Error ? error.message : "Unable to call backend",
        },
      },
      { status: 500 },
    );
  }
}
