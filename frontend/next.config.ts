import type { NextConfig } from "next";

/**
 * 모든 응답에 붙는 보안 헤더.
 *
 * - HSTS에 includeSubDomains는 넣지 않는다. etf.inter.vc 같은 서브도메인은 이 앱이
 *   아닌 별개 사이트라, 그쪽이 HTTPS를 못 내는 순간 브라우저가 접속을 막아 버린다.
 * - CSP는 넣지 않는다. 애드센스가 여러 구글 도메인에서 스크립트·iframe을 불러오므로
 *   목록을 틀리면 광고가 조용히 안 뜬다. LiteSpeed가 upgrade-insecure-requests만 붙인다.
 */
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // 응답에 x-powered-by: Next.js를 붙이지 않는다.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

  images: {
    // Hostinger 공유호스팅 환경에서 Next.js 이미지 최적화 엔드포인트가 503을 내는
    // 문제가 있어(CageFS 샌드박스에서 sharp 처리 실패로 추정), 최적화를 끄고
    // /public의 원본 파일을 그대로 서빙한다.
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        // 모음집을 /investment로 먼저 배포했다가 /collection으로 옮겼다.
        // sitemap에 이미 올라간 주소라 죽는 링크가 되지 않도록 넘겨준다.
        // permanent는 301이 아니라 308을 낸다(구글은 동일하게 처리).
        source: "/investment",
        destination: "/collection",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
