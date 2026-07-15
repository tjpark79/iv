import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteContactSubmission } from "@/lib/content";
import db from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ detail: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const existing = db.prepare(`SELECT id FROM contact_submissions WHERE id = ?`).get(id);
  if (!existing) {
    return NextResponse.json({ detail: "찾을 수 없습니다." }, { status: 404 });
  }
  deleteContactSubmission(Number(id));
  return new NextResponse(null, { status: 204 });
}
