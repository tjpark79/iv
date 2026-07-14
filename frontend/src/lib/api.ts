const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return res.json();
}

export const getServices = () => getJson<Service[]>("/api/public/services");
export const getPortfolio = () => getJson<PortfolioItem[]>("/api/public/portfolio");
export const getTimeline = () => getJson<TimelineEntry[]>("/api/public/timeline");
export const getTeam = () => getJson<TeamMember[]>("/api/public/team");
export const getClients = () => getJson<Client[]>("/api/public/clients");

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("문의 접수에 실패했습니다.");
  }
}
