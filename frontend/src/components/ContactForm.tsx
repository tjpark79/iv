"use client";

import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");
    try {
      await submitContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  const inputClasses =
    "w-full rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/60";

  return (
    <section id="contact" className="py-24 md:py-36 bg-brand">
      <div className="mx-auto max-w-2xl px-6">
        <div className="max-w-xl mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-white">
            연락처
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <input name="name" type="text" required placeholder="성함" className={inputClasses} />
            <input
              name="email"
              type="email"
              required
              placeholder="이메일"
              className={inputClasses}
            />
          </div>
          <input name="phone" type="tel" required placeholder="연락처" className={inputClasses} />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="내용"
            className={inputClasses}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand hover:bg-white/90 transition-colors disabled:opacity-60"
            >
              {status === "submitting" ? "전송 중..." : "전송"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-sm text-white/80">
              문의가 정상적으로 접수되었습니다. 감사합니다.
            </p>
          )}
          {status === "error" && <p className="text-sm text-red-200">{error}</p>}
        </form>
      </div>
    </section>
  );
}
