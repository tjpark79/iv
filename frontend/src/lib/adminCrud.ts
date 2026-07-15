import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "./auth";
import db from "./db";

const UNAUTHORIZED = () => NextResponse.json({ detail: "인증이 필요합니다." }, { status: 401 });
const NOT_FOUND = () => NextResponse.json({ detail: "찾을 수 없습니다." }, { status: 404 });

/** 목록 조회(GET) + 생성(POST) 핸들러를 만든다. 하나의 테이블/필드 목록에 대해 재사용. */
export function makeCrudHandlers(table: string, fields: string[]) {
  async function GET(request: NextRequest) {
    if (!(await requireAdmin(request))) return UNAUTHORIZED();
    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY "order"`).all();
    return NextResponse.json(rows);
  }

  async function POST(request: NextRequest) {
    if (!(await requireAdmin(request))) return UNAUTHORIZED();
    const data = await request.json();
    const cols = fields.map((f) => `"${f}"`).join(", ");
    const placeholders = fields.map(() => "?").join(", ");
    const info = db
      .prepare(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`)
      .run(...fields.map((f) => data[f] ?? (f === "order" ? 0 : "")));
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(info.lastInsertRowid);
    return NextResponse.json(row, { status: 201 });
  }

  return { GET, POST };
}

/** 단건 수정(PUT) + 삭제(DELETE) 핸들러를 만든다. */
export function makeItemCrudHandlers(table: string, fields: string[]) {
  async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin(request))) return UNAUTHORIZED();
    const { id } = await params;
    const data = await request.json();
    const setClause = fields.map((f) => `"${f}" = ?`).join(", ");
    db.prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`).run(
      ...fields.map((f) => data[f]),
      id
    );
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    if (!row) return NOT_FOUND();
    return NextResponse.json(row);
  }

  async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin(request))) return UNAUTHORIZED();
    const { id } = await params;
    const info = db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
    if (info.changes === 0) return NOT_FOUND();
    return new NextResponse(null, { status: 204 });
  }

  return { PUT, DELETE };
}
