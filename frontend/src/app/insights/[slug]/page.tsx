import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  SERIES,
  formatDate,
  getAllInsights,
  getInsight,
} from "@/lib/insights";

export async function generateStaticParams() {
  return getAllInsights().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};

  return {
    title: `${post.title} | 인터벤처스`,
    description: post.description,
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/insights/${post.slug}`,
      publishedTime: post.date,
      siteName: SITE_NAME,
    },
  };
}

export default async function InsightPage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const others = getAllInsights()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // 검색결과에 글 제목·날짜가 기사로 인식되도록 구조화 데이터를 넣는다.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article>
          <header className="bg-brand py-16 md:py-24">
            <div className="mx-auto max-w-3xl px-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href="/insights"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  인사이트
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white/70">{SERIES[post.series]}</span>
              </div>
              <h1 className="section-heading mt-5 text-3xl md:text-4xl font-bold text-white text-balance">
                {post.title}
              </h1>
              <p className="mt-5 text-white/80 leading-relaxed">
                {post.description}
              </p>
              <time
                dateTime={post.date}
                className="mt-6 block font-mono text-sm text-white/60"
              >
                {formatDate(post.date)}
              </time>
            </div>
          </header>

          <div className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-3xl px-6">
              <div
                className="prose-body"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {post.tags.length > 0 && (
                <div className="mt-14 flex flex-wrap gap-2 border-t border-brand-border pt-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-brand-light px-2.5 py-1 text-xs text-brand"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="py-16 md:py-20 bg-brand-light">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="section-heading text-xl font-bold text-foreground">
                다른 글
              </h2>
              <ul className="mt-6 divide-y divide-black/10 border-t border-b border-black/10">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/insights/${other.slug}`}
                      className="block py-5 group"
                    >
                      <span className="text-xs text-brand font-medium">
                        {SERIES[other.series]}
                      </span>
                      <p className="mt-1.5 font-semibold text-foreground group-hover:text-brand transition-colors">
                        {other.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/insights"
                className="mt-8 inline-block text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                인사이트 전체 보기
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
