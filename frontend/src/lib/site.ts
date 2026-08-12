/**
 * 사이트 전역 상수. robots.ts, sitemap.ts, layout의 metadataBase가 모두 여기를
 * 참조한다. 도메인이 바뀌면 이 파일만 고친다.
 */

// www.inter.vc도 같은 앱을 서빙하므로, apex를 대표 주소로 삼고 canonical로 알린다.
export const SITE_URL = "https://inter.vc";

export const SITE_NAME = "interVentures";

/**
 * sitemap의 lastmod로 나가는 값. 빌드 시각을 쓰면 내용이 그대로인데도 매 배포마다
 * 갱신된 것처럼 보이므로, 실제 콘텐츠를 고친 날짜를 손으로 적는다.
 */
export const CONTENT_UPDATED_AT = "2026-08-12";
