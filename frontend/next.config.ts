import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hostinger 공유호스팅 환경에서 Next.js 이미지 최적화 엔드포인트가 503을 내는
    // 문제가 있어(CageFS 샌드박스에서 sharp 처리 실패로 추정), 최적화를 끄고
    // /public의 원본 파일을 그대로 서빙한다.
    unoptimized: true,
  },
};

export default nextConfig;
