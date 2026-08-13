import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/site";

export default function LegalLayout({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-brand py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="section-heading text-3xl md:text-4xl font-bold text-white">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-white/80 leading-relaxed">
              {summary}
            </p>
            <p className="mt-6 font-mono text-sm text-white/60">
              시행일 {LEGAL_EFFECTIVE_DATE}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6">
            <div className="prose-body">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
