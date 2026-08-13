import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPortfolio, SERVICES_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: "서비스 | 인터벤처스",
  description:
    "경영전략 컨설팅, 재무기획 컨설팅, M&A 전략 컨설팅, 강의, IR 리포트 작성, 멘토링 — 인터벤처스가 초기 기업과 함께 수행하는 여섯 가지 업무를 안내합니다.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const items = getPortfolio();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="section-heading text-4xl md:text-5xl font-bold text-white">
              서비스
            </h1>
            <div className="mt-6 space-y-4 max-w-2xl">
              {SERVICES_INTRO.map((paragraph, i) => (
                <p key={i} className="text-white/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <nav aria-label="서비스 목록" className="mb-16">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.slug}`}
                      className="text-brand hover:text-brand-dark font-medium transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-20">
              {items.map((item, i) => (
                <article
                  key={item.id}
                  id={item.slug}
                  className="scroll-mt-24 border-t border-brand-border pt-8"
                >
                  <div className="flex items-start gap-6">
                    {/* 이 이미지는 sm 미만에서 렌더되지 않는다. priority를 주면
                        모바일에도 preload 링크가 나가 보이지도 않는 파일을
                        내려받게 되므로 쓰지 않는다. */}
                    <div className="relative hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={item.thumbnail_url}
                        alt=""
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-mono text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-2 text-2xl font-bold text-foreground">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-muted">{item.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
                    <p>{item.description}</p>
                    <p>{item.detail}</p>
                  </div>

                  <h3 className="mt-8 text-sm font-semibold text-foreground">
                    진행 방식
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {item.steps.map((step, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-brand"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                    <div className="flex gap-2">
                      <dt className="text-muted">업무기간</dt>
                      <dd className="text-brand font-medium">{item.duration}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted">분야</dt>
                      <dd className="text-brand font-medium">{item.category}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="mt-20 border-t border-brand-border pt-8">
              <p className="text-muted leading-relaxed">
                어느 서비스가 맞을지 판단이 서지 않아도 괜찮습니다. 현재 단계와
                풀어야 할 문제를 먼저 들은 뒤에 범위를 함께 정합니다.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                인터벤처스 소개 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
