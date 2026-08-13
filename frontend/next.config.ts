import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
