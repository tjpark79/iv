import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  COLLECTION_GROUPS,
  itemHost,
  type CollectionItem,
} from "@/lib/collection";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "모음집 | 인터벤처스",
  description:
    "인터벤처스가 따로 운영하는 도구를 모았습니다. 국내외 ETF 지표 비교, 포트폴리오 시뮬레이션, 연금저축·IRP·ISA 절세계좌 가이드와 수령액 계산기를 제공합니다.",
  path: "/collection",
});

function ItemCard({ item }: { item: CollectionItem }) {
  const host = itemHost(item);

  // url이 없는 항목은 링크가 아니라 점선 카드로 둔다.
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">
          {item.title}
          {item.url && (
            <span aria-hidden="true" className="ml-1.5 text-brand">
              ↗
            </span>
          )}
        </h3>
        <span
          className={
            item.url
              ? "shrink-0 rounded-full bg-brand px-2.5 py-0.5 text-xs text-white"
              : "shrink-0 rounded-full border border-brand-border px-2.5 py-0.5 text-xs text-muted"
          }
        >
          {item.url ? "운영중" : "준비중"}
        </span>
      </div>
      <p className="mt-2.5 text-sm text-muted leading-relaxed">{item.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted">
        <span>{item.kind}</span>
        {host && (
          <>
            <span aria-hidden="true">·</span>
            <span>{host}</span>
          </>
        )}
      </div>
    </>
  );

  if (!item.url) {
    return (
      <div className="rounded-md border border-dashed border-brand-border p-5">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener"
      className="block rounded-md border border-brand-border bg-white p-5 transition-colors hover:border-brand"
    >
      {inner}
    </a>
  );
}

export default function CollectionPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="section-heading text-4xl md:text-5xl font-bold text-white">
              모음집
            </h1>
            <p className="mt-6 max-w-2xl text-white/80 leading-relaxed">
              인터벤처스가 본업과 별개로 만들어 운영하는 도구를 모았습니다.
              기업을 분석하던 방식은 자기 돈을 굴릴 때도 그대로 쓰입니다. ETF
              지표를 모아 비교하고 연금 계좌를 설계해 보는 도구가 여기 있습니다.
              항목을 누르면 해당 사이트로 이동합니다.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-4xl px-6 space-y-16">
            {COLLECTION_GROUPS.map((group) => (
              <div key={group.slug} id={group.slug} className="scroll-mt-24">
                <h2 className="section-heading text-2xl md:text-3xl font-bold text-foreground border-t border-brand-border pt-8">
                  {group.name}
                </h2>
                <p className="mt-3 max-w-2xl text-muted leading-relaxed">
                  {group.desc}
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <ItemCard key={item.title} item={item} />
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-brand-border pt-8">
              <p className="text-sm text-muted leading-relaxed">
                위 도구가 제공하는 정보는 참고용이며 특정 금융투자상품의 매매를
                권유하지 않습니다. 과거의 성과가 미래의 수익을 보장하지 않고,
                투자 판단과 그 결과에 대한 책임은 이용자 본인에게 있습니다.
                자세한 내용은{" "}
                <Link
                  href="/terms"
                  className="text-brand hover:text-brand-dark font-medium transition-colors"
                >
                  이용약관
                </Link>
                에서 정합니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
