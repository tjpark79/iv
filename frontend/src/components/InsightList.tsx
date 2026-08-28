"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SERIES, type InsightMeta, type SeriesKey } from "@/lib/series";

/**
 * 시리즈 칩으로 목록을 걸러 보여준다. 글이 스무 편 남짓이라 서버에서 전부
 * 내려주고 화면에서만 거른다. 시리즈별 정적 페이지를 따로 만들지 않은 이유는
 * 목록만 있는 얇은 페이지를 색인에 늘리지 않기 위해서다.
 */

// SERIES에서 파생시킨다. 손으로 나열하면 시리즈를 추가했을 때 칩이 조용히
// 빠진다. 표시 순서는 SERIES의 선언 순서를 그대로 따른다.
const SERIES_ORDER = Object.keys(SERIES) as SeriesKey[];

/** 고른 시리즈는 ?series=equity 로 남긴다. 링크를 그대로 공유할 수 있도록. */
const PARAM = "series";

function isSeriesKey(value: string | null): value is SeriesKey {
  // 주소창에서 오는 값이라 `in`은 쓰지 않는다. constructor 같은 프로토타입
  // 이름까지 통과해 버린다.
  return value !== null && Object.hasOwn(SERIES, value);
}

function seriesFromLocation(): SeriesKey | null {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return isSeriesKey(value) ? value : null;
}

export default function InsightList({ posts }: { posts: InsightMeta[] }) {
  // 정적 HTML은 항상 「전체」로 그려진다. 주소창의 값을 초기값으로 삼으면
  // 서버 렌더 결과와 어긋나 hydration 오류가 나므로, 붙은 뒤에 맞춘다.
  const [selected, setSelected] = useState<SeriesKey | null>(null);

  useEffect(() => {
    const sync = () => setSelected(seriesFromLocation());
    sync();
    // 뒤로/앞으로 가기로 돌아왔을 때도 칩과 목록이 주소를 따라가게 한다.
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const countBySeries = new Map<SeriesKey, number>();
  for (const post of posts) {
    countBySeries.set(post.series, (countBySeries.get(post.series) ?? 0) + 1);
  }

  const visible = selected
    ? posts.filter((post) => post.series === selected)
    : posts;

  function select(key: SeriesKey | null) {
    setSelected(key);

    const url = new URL(window.location.href);
    if (key) {
      url.searchParams.set(PARAM, key);
    } else {
      url.searchParams.delete(PARAM);
    }
    // 칩을 누른 것도 되돌릴 수 있게 이력에 쌓는다. Next.js는 네이티브
    // history API 호출을 라우터와 동기화하므로 router.push는 쓰지 않는다.
    window.history.pushState(null, "", url);
  }

  const chipBase =
    "rounded-sm px-3 py-1.5 text-sm transition-colors cursor-pointer";

  return (
    <>
      <div
        role="group"
        aria-label="시리즈로 거르기"
        className="mb-14 flex flex-wrap gap-2 -ml-3"
      >
        <button
          type="button"
          onClick={() => select(null)}
          aria-pressed={selected === null}
          className={`${chipBase} ${
            selected === null
              ? "bg-brand text-white"
              : "text-muted hover:bg-brand-light hover:text-brand"
          }`}
        >
          전체
          <span
            className={`ml-1.5 font-mono ${
              selected === null ? "text-white/70" : "text-brand"
            }`}
          >
            {posts.length}
          </span>
        </button>

        {SERIES_ORDER.map((key) => {
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => select(key)}
              aria-pressed={active}
              className={`${chipBase} ${
                active
                  ? "bg-brand text-white"
                  : "text-muted hover:bg-brand-light hover:text-brand"
              }`}
            >
              {SERIES[key]}
              <span
                className={`ml-1.5 font-mono ${
                  active ? "text-white/70" : "text-brand"
                }`}
              >
                {countBySeries.get(key) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">이 시리즈에는 아직 글이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-brand-border border-t border-b border-brand-border">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link href={`/insights/${post.slug}`} className="block py-8 group">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-brand font-medium">
                    {SERIES[post.series]}
                  </span>
                  <time dateTime={post.date} className="font-mono text-muted">
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
      )}
    </>
  );
}
