import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "문의 | 인터벤처스",
  description:
    "(주)인터벤처스 연락처입니다. 경영전략·재무기획·투자유치 관련 문의는 이메일로 보내주시면 확인 후 회신드립니다.",
  path: "/contact",
});

const MAIL_SUBJECT = "인터벤처스 컨설팅 문의";

/** 문의 메일에 담기면 회신이 빨라지는 항목. */
const HELPFUL_ITEMS = [
  "회사명과 하시는 일 (한두 문장이면 충분합니다)",
  "현재 단계 — 창업 준비, 법인 설립 직후, 매출 발생, 투자 유치 진행 중 등",
  "지금 풀고 싶은 문제 — 재무추정 작성, 기업가치 산출, IR 자료, 지분 정리 등",
  "희망하는 일정과 연락 가능한 시간대",
];

export default function ContactPage() {
  const mailto = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address,
      addressCountry: "KR",
    },
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="section-heading text-4xl md:text-5xl font-bold text-white">
              문의
            </h1>
            <p className="mt-6 max-w-2xl text-white/80 leading-relaxed">
              경영전략, 재무기획, 투자유치와 관련한 문의는 이메일로 보내주시면
              확인 후 회신드립니다. 어떤 서비스가 맞을지 판단이 서지 않아도
              괜찮습니다. 현재 상황을 먼저 듣고 범위를 함께 정합니다.
            </p>
            <a
              href={mailto}
              className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand hover:bg-white/90 transition-colors"
            >
              {BUSINESS.email} 로 메일 보내기
            </a>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="section-heading text-2xl md:text-3xl font-bold text-foreground">
              메일에 담아주시면 좋은 내용
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              아래가 있으면 첫 회신부터 구체적인 이야기를 드릴 수 있습니다. 전부
              적으실 필요는 없고, 지금 아시는 만큼만 적어주셔도 됩니다.
            </p>
            <ul className="mt-8 space-y-3">
              {HELPFUL_ITEMS.map((item) => (
                <li
                  key={item}
                  className="text-foreground/90 leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-brand"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted leading-relaxed">
              보내주신 내용은 회신 목적으로만 사용하며, 처리 기준은{" "}
              <Link
                href="/privacy"
                className="text-brand hover:text-brand-dark font-medium transition-colors"
              >
                개인정보처리방침
              </Link>
              에 따릅니다.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-brand-light">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="section-heading text-xl font-bold text-foreground">
              사업자 정보
            </h2>
            <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-muted">상호</dt>
                <dd className="mt-1 text-foreground">{BUSINESS.legalName}</dd>
              </div>
              <div>
                <dt className="text-muted">대표자</dt>
                <dd className="mt-1 text-foreground">{BUSINESS.ceo}</dd>
              </div>
              <div>
                <dt className="text-muted">사업자등록번호</dt>
                <dd className="mt-1 text-foreground font-mono">
                  {BUSINESS.registrationNumber}
                </dd>
              </div>
              <div>
                <dt className="text-muted">이메일</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-brand hover:text-brand-dark transition-colors"
                  >
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted">주소</dt>
                <dd className="mt-1 text-foreground">{BUSINESS.address}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
