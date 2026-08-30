import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import {
  HOME_ABOUT_SUMMARY,
  getPortfolio,
  getServices,
  getTimeline,
} from "@/lib/content";
import { SERIES, getAllInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

// 애드센스 소유권 확인 메타태그는 루트 URL에만 실린다. 루트 레이아웃에 두면
// 404를 포함한 모든 라우트에 상속돼 "콘텐츠 없는 화면에 광고" 사유가 된다.
export const metadata: Metadata = {
  // www.inter.vc도 같은 내용을 200으로 서빙하므로 apex를 대표 주소로 못박는다.
  ...pageMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  other: {
    "google-adsense-account": "ca-pub-8977093633487347",
  },
};

export default function Home() {
  const services = getServices();
  const portfolio = getPortfolio();
  // 이력 전체는 /about에만 둔다. 홈에는 인터벤처스 이전의 경력만 짧게 보여준다.
  // 인덱스로 자르면 이력을 추가할 때 조용히 어긋나므로 이름으로 거른다.
  const career = getTimeline()
    .filter((entry) => entry.organization !== "인터벤처스")
    .slice(0, 3);
  const latestPosts = getAllInsights().slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <Services services={services} />

        <section id="portfolio" className="py-24 md:py-32 bg-brand-light">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-xl mb-14">
              <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
                서비스
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                한 가지만 단발성으로 진행하기도 하고, 업무협약 기간 동안 여러 건을
                묶어 계속 함께 가기도 합니다.
              </p>
            </div>

            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {portfolio.map((item) => (
                <li key={item.id} className="border-t border-black/10 pt-5">
                  <Link href={`/services#${item.slug}`} className="group block">
                    <h3 className="font-semibold text-foreground group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">
                      {item.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="mt-12 inline-block text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              서비스 자세히 보기
            </Link>
          </div>
        </section>

        <section id="about" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
                인터벤처스
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                {HOME_ABOUT_SUMMARY}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                회사 소개 자세히 보기
              </Link>
            </div>

            <ul className="space-y-5 md:pt-3">
              {career.map((entry) => (
                <li key={entry.id} className="flex gap-5 text-sm">
                  <span className="w-24 shrink-0 font-mono text-muted">
                    {entry.period}
                  </span>
                  <span className="text-foreground">{entry.organization}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {latestPosts.length > 0 && (
          <section className="py-24 md:py-32 bg-brand-light">
            <div className="mx-auto max-w-6xl px-6">
              <div className="max-w-xl mb-14">
                <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
                  인사이트
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  창업 초기에 마주치는 결정 가운데 되돌리기 어렵거나 숫자를 잘못
                  읽으면 대가가 큰 것들을 다룹니다.
                </p>
              </div>

              <ul className="grid gap-x-10 gap-y-10 md:grid-cols-3">
                {latestPosts.map((post) => (
                  <li key={post.slug} className="border-t border-black/10 pt-5">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-brand font-medium">
                          {SERIES[post.series]}
                        </span>
                        <time dateTime={post.date} className="font-mono text-muted">
                          {post.date}
                        </time>
                      </div>
                      <h3 className="mt-3 font-semibold text-foreground group-hover:text-brand transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {post.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/insights"
                className="mt-12 inline-block text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                인사이트 전체 보기
              </Link>
            </div>
          </section>
        )}

        <section className="py-20 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="section-heading text-2xl md:text-3xl font-bold text-foreground">
              어느 단계에 계시든 괜찮습니다
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              창업을 준비 중이든, 첫 투자를 앞두고 있든, 이미 매출이 나고 있든
              지금 풀어야 할 문제부터 듣고 범위를 함께 정합니다.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-md bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              문의하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
