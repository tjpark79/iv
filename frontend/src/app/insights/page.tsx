import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SERIES, getAllInsights, type SeriesKey } from "@/lib/insights";

export const metadata: Metadata = {
  title: "인사이트 | 인터벤처스",
  description:
    "창업 초기에 마주치는 지분·재무·투자유치 문제를 다룹니다. 증권사 리서치와 자산운용 현장에서 쓰던 기준으로, 스타트업 대표들이 실제로 겪는 결정들을 정리합니다.",
  alternates: {
    canonical: "/insights",
  },
};

const SERIES_ORDER: SeriesKey[] = [
  "equity",
  "finance",
  "fundraising",
  "operations",
];

export default function InsightsPage() {
  const posts = getAllInsights();
  const countBySeries = new Map<SeriesKey, number>();
  for (const post of posts) {
    countBySeries.set(post.series, (countBySeries.get(post.series) ?? 0) + 1);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="section-heading text-4xl md:text-5xl font-bold text-white">
              인사이트
            </h1>
            <p className="mt-6 max-w-2xl text-white/80 leading-relaxed">
              창업 초기에 마주치는 결정들 가운데, 되돌리기 어렵거나 숫자를 잘못
              읽으면 대가가 큰 것들을 다룹니다. 일반적인 창업 조언보다는 지분과
              재무처럼 구체적인 판단이 필요한 영역에 집중합니다.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            {posts.length === 0 ? (
              <p className="text-muted">아직 등록된 글이 없습니다.</p>
            ) : (
              <>
                <div className="mb-14 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {SERIES_ORDER.map((key) => (
                    <span key={key} className="text-muted">
                      {SERIES[key]}
                      <span className="ml-1.5 font-mono text-brand">
                        {countBySeries.get(key) ?? 0}
                      </span>
                    </span>
                  ))}
                </div>

                <ul className="divide-y divide-brand-border border-t border-b border-brand-border">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/insights/${post.slug}`}
                        className="block py-8 group"
                      >
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="text-brand font-medium">
                            {SERIES[post.series]}
                          </span>
                          <time
                            dateTime={post.date}
                            className="font-mono text-muted"
                          >
                            {post.date}
                          </time>
                        </div>
                        <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-brand transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                          {post.description}
                        </p>
                        {post.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-sm bg-brand-light px-2 py-0.5 text-xs text-brand"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-14 text-sm text-muted leading-relaxed">
              글에서 다룬 내용을 각자의 상황에 어떻게 적용할지는 회사마다
              다릅니다.{" "}
              <Link
                href="/services"
                className="text-brand hover:text-brand-dark font-medium transition-colors"
              >
                인터벤처스가 하는 일
              </Link>
              을 함께 보셔도 좋습니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
