import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

const JWT_ALG = "HS256";

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다");
  return new TextEncoder().encode(secret);
}

export async function createAccessToken(subject: string): Promise<string> {
  const minutes = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES ?? 1440);
  return new SignJWT({})
    .setProtectedHeader({ alg: JWT_ALG })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + minutes * 60)
    .sign(getSecretKey());
}

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}

/** Authorization: Bearer 헤더를 검증하고, 유효하면 subject(관리자 아이디)를 반환한다. */
export async function requireAdmin(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice("Bearer ".length);
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: [JWT_ALG] });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
