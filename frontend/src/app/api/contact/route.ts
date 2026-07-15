import { NextResponse, type NextRequest } from "next/server";
import { createContactSubmission } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, phone, message } = data ?? {};

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ detail: "입력값이 올바르지 않습니다." }, { status: 422 });
  }

  const submission = createContactSubmission({
    name: String(name),
    email: String(email),
    phone: String(phone ?? ""),
    message: String(message),
  });
  return NextResponse.json(submission, { status: 201 });
}
