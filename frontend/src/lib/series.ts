/**
 * 시리즈 정의와 목록용 타입. 파일을 읽는 insights.ts와 갈라 둔 이유는,
 * 목록 화면(클라이언트 컴포넌트)이 이 상수를 쓰기 때문이다. insights.ts에서
 * 가져가면 node:fs가 브라우저 번들에 딸려 들어가 빌드가 깨진다.
 */

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
