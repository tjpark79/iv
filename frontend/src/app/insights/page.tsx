import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightList from "@/components/InsightList";
import { getAllInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "인사이트 | 인터벤처스",
  description:
    "창업 초기에 마주치는 지분·재무·투자유치 문제를 다룹니다. 증권사 리서치와 자산운용 현장에서 쓰던 기준으로, 스타트업 대표들이 실제로 겪는 결정들을 정리합니다.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getAllInsights();

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
              <InsightList posts={posts} />
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
