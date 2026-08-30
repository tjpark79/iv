/**
 * 사이트 전역 상수. robots.ts, sitemap.ts, layout의 metadataBase가 모두 여기를
 * 참조한다. 도메인이 바뀌면 이 파일만 고친다.
 */

// www.inter.vc도 같은 앱을 서빙하므로, apex를 대표 주소로 삼고 canonical로 알린다.
export const SITE_URL = "https://inter.vc";

export const SITE_NAME = "interVentures";

/** 홈과 루트 레이아웃이 함께 쓰는 제목·설명. 홈에는 따로 두지 않는다. */
export const SITE_TITLE = "interVentures | 인터벤처스";
export const SITE_DESCRIPTION =
  "대한민국 국가경쟁력을 선도할 스타트업들과 함께 뛰는 인터벤처스";

/**
 * sitemap의 lastmod로 나가는 값. 빌드 시각을 쓰면 내용이 그대로인데도 매 배포마다
 * 갱신된 것처럼 보이므로, 실제 콘텐츠를 고친 날짜를 손으로 적는다.
 *
 * 이건 /about·/services 같은 고정 페이지용이다. 홈과 /insights는 글이 늘면
 * 같이 바뀌므로 sitemap.ts가 최신 글 날짜와 비교해 더 나중 것을 쓴다.
 */
export const CONTENT_UPDATED_AT = "2026-08-28";

/**
 * 법적 고지에 쓰는 사업자 정보. /contact, /privacy, /terms가 모두 여기를 참조한다.
 * 등기 상호이므로 임의로 표기를 바꾸지 않는다.
 */
export const BUSINESS = {
  legalName: "(주)인터벤처스",
  ceo: "박태준",
  registrationNumber: "453-86-01551",
  address: "서울특별시 서초구 서운로 226, 316호",
  email: "tjpark@inter.vc",
  privacyOfficer: "박태준 (대표)",
} as const;

/** 개인정보처리방침·이용약관 시행일. 내용을 고치면 같이 올린다. */
export const LEGAL_EFFECTIVE_DATE = "2026-08-13";

/**
 * 이제이(ejay.world)는 인터벤처스와 상호 비즈니스 연결 관계에 있는 주체다.
 * 양쪽 방침이 어긋나면 안 되므로 표기를 상수로 고정한다.
 */
export const AFFILIATE = {
  name: "이제이",
  url: "https://ejay.world",
} as const;
