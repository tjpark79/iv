import "server-only";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

let instance: DatabaseSync | null = null;

function openDatabase(): DatabaseSync {
  const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "interventures.db");
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

  const database = new DatabaseSync(DB_PATH);
  // WAL + busy_timeout: 여러 프로세스(빌드 워커, Passenger 등)가 동시에 파일을
  // 열 때 "database is locked" 즉시 실패 대신 잠깐 대기하도록 한다.
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec("PRAGMA busy_timeout = 5000;");

  database.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL DEFAULT 0,
      icon TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS portfolio_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      duration TEXT NOT NULL DEFAULT '',
      thumbnail_url TEXT NOT NULL DEFAULT '',
      full_image_url TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS timeline_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL DEFAULT 0,
      period TEXT NOT NULL,
      organization TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      highlights TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      bio TEXT NOT NULL DEFAULT '',
      photo_url TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "order" INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      logo_url TEXT NOT NULL DEFAULT '',
      link_url TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return database;
}

function getInstance(): DatabaseSync {
  if (!instance) instance = openDatabase();
  return instance;
}

// 모듈 import 시점(빌드의 "collect page data" 단계 등)에는 파일을 열지 않고,
// 실제로 쿼리를 실행하는 첫 호출 시점에만 연결을 연다.
const db = new Proxy({} as DatabaseSync, {
  get(_target, prop, receiver) {
    const target = getInstance();
    const value = Reflect.get(target as object, prop, receiver);
    return typeof value === "function" ? value.bind(target) : value;
  },
});

export default db;
