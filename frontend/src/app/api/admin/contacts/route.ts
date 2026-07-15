import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listContactSubmissions } from "@/lib/content";

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ detail: "인증이 필요합니다." }, { status: 401 });
  }
  return NextResponse.json(listContactSubmissions());
}
