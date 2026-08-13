import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import { ABOUT_INTRO, WORKING_PRINCIPLES, getTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "회사 소개 | 인터벤처스",
  description:
    "인터벤처스는 2018년부터 초기 기업의 경영과 재무를 맡아 온 회사입니다. 증권사 리서치와 자산운용 경험을 바탕으로 CFO·CSO의 역할을 외부에서 수행합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const timeline = getTimeline();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="section-heading text-4xl md:text-5xl font-bold text-white">
              회사 소개
            </h1>
            <div className="mt-6 space-y-4 max-w-2xl">
              {ABOUT_INTRO.map((paragraph, i) => (
                <p key={i} className="text-white/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
              일하는 방식
            </h2>
            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {WORKING_PRINCIPLES.map((principle, i) => (
                <div key={i} className="border-t border-brand-border pt-6">
                  <span className="text-sm font-mono text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Timeline entries={timeline} />

        <section className="py-16 bg-brand-light">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-muted leading-relaxed">
              어떤 일을 어떻게 진행하는지는 서비스 페이지에 정리해 두었고, 초기
              기업이 자주 부딪히는 결정들은 인사이트에서 다룹니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
              <Link
                href="/services"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                서비스 보기
              </Link>
              <Link
                href="/insights"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                인사이트 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
