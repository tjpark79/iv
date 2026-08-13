import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * 인사이트 글은 content/insights/*.md 파일이다. DB를 두지 않는 이유와 같다 —
 * 파일이 git에 들어가므로 Hostinger가 배포 때마다 앱 폴더를 재생성해도 글이
 * 사라지지 않는다. 글을 추가하려면 이 폴더에 .md 파일 하나만 넣으면 된다.
 */
const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

/** 글이 속한 시리즈. 목록 페이지의 분류로 쓴다. */
export const SERIES = {
  equity: "지분과 자본구조",
  finance: "숫자와 재무계획",
  fundraising: "투자유치와 IR",
  operations: "창업 초기 운영",
} as const;

export type SeriesKey = keyof typeof SERIES;

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  series: SeriesKey;
  tags: string[];
};

export type Insight = InsightMeta & {
  /** 마크다운을 변환한 HTML */
  html: string;
  /** 본문 글자 수(공백 제외). 목록에서 분량을 가늠하는 용도. */
  charCount: number;
};

function isSeriesKey(value: unknown): value is SeriesKey {
  return typeof value === "string" && value in SERIES;
}

/**
 * 프론트매터를 검증한다. 글을 새로 쓸 때 항목을 빠뜨리면 빌드가 실패하도록
 * 했다. 잘못된 값이 조용히 배포돼 색인되는 것보다 낫다.
 */
function parseMeta(slug: string, data: Record<string, unknown>): InsightMeta {
  const required = ["title", "description", "date", "series"] as const;
  for (const key of required) {
    if (!data[key]) {
      throw new Error(
        `content/insights/${slug}.md: 프론트매터에 '${key}'가 없습니다.`
      );
    }
  }

  if (!isSeriesKey(data.series)) {
    throw new Error(
      `content/insights/${slug}.md: series 값 '${String(data.series)}'는 없는 시리즈입니다. ` +
        `가능한 값: ${Object.keys(SERIES).join(", ")}`
    );
  }

  // gray-matter는 따옴표 없는 YAML 날짜를 Date로 파싱한다. 문자열로 통일한다.
  const rawDate = data.date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : String(rawDate);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `content/insights/${slug}.md: date는 YYYY-MM-DD 형식이어야 합니다 (받은 값: ${date}).`
    );
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date,
    series: data.series,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

function readSlugs(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

/** 목록용. 본문 변환 없이 프론트매터만 읽어 최신순으로 돌려준다. */
export function getAllInsights(): InsightMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, `${slug}.md`), "utf8");
      return parseMeta(slug, matter(raw).data);
    })
    // 날짜가 같은 글의 순서가 파일시스템 순서에 좌우되지 않도록 slug로 묶는다.
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** 본문용. 없는 slug면 null을 돌려준다(호출부에서 notFound 처리). */
export async function getInsight(slug: string): Promise<Insight | null> {
  const file = path.join(INSIGHTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    ...parseMeta(slug, data),
    html: String(processed),
    charCount: content.replace(/\s/g, "").length,
  };
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}
