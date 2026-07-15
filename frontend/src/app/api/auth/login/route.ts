import { NextResponse, type NextRequest } from "next/server";
import { checkAdminCredentials, createAccessToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) ?? {};

  if (!checkAdminCredentials(username, password)) {
    return NextResponse.json(
      { detail: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const access_token = await createAccessToken(username);
  return NextResponse.json({ access_token, token_type: "bearer" });
}
