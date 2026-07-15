import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { markContactRead } from "@/lib/content";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ detail: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const updated = markContactRead(Number(id));
  if (!updated) {
    return NextResponse.json({ detail: "찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json(updated);
}
