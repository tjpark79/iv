export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("문의 접수에 실패했습니다.");
  }
}
