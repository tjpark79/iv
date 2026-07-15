import "server-only";
import db from "./db";

export type Service = {
  id: number;
  order: number;
  icon: string;
  title: string;
  description: string;
};

export type PortfolioItem = {
  id: number;
  order: number;
  title: string;
  summary: string;
  description: string;
  category: string;
  duration: string;
  thumbnail_url: string;
  full_image_url: string;
};

export type TimelineEntry = {
  id: number;
  order: number;
  period: string;
  organization: string;
  description: string;
  highlights: string;
  image_url: string;
};

export type TeamMember = {
  id: number;
  order: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
};

export type Client = {
  id: number;
  order: number;
  name: string;
  logo_url: string;
  link_url: string;
};

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: number;
  created_at: string;
};

// node:sqlite returns null-prototype row objects, which React's RSC
// serialization rejects when passed down to Client Components.
function toPlainObject<T>(row: unknown): T {
  return { ...(row as object) } as T;
}

function listAll<T>(table: string): T[] {
  return (db.prepare(`SELECT * FROM ${table} ORDER BY "order"`).all() as object[]).map(
    toPlainObject<T>
  );
}

export const getServices = () => listAll<Service>("services");
export const getPortfolio = () => listAll<PortfolioItem>("portfolio_items");
export const getTimeline = () => listAll<TimelineEntry>("timeline_entries");
export const getTeam = () => listAll<TeamMember>("team_members");
export const getClients = () => listAll<Client>("clients");

export function createContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ContactSubmission {
  const info = db
    .prepare(`INSERT INTO contact_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)`)
    .run(data.name, data.email, data.phone, data.message);
  return db
    .prepare(`SELECT * FROM contact_submissions WHERE id = ?`)
    .get(info.lastInsertRowid) as ContactSubmission;
}

export function listContactSubmissions(): ContactSubmission[] {
  return db
    .prepare(`SELECT * FROM contact_submissions ORDER BY created_at DESC`)
    .all() as ContactSubmission[];
}

export function markContactRead(id: number): ContactSubmission | undefined {
  db.prepare(`UPDATE contact_submissions SET is_read = 1 WHERE id = ?`).run(id);
  return db.prepare(`SELECT * FROM contact_submissions WHERE id = ?`).get(id) as
    | ContactSubmission
    | undefined;
}

export function deleteContactSubmission(id: number): void {
  db.prepare(`DELETE FROM contact_submissions WHERE id = ?`).run(id);
}
