import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { getPortfolio, getServices, getTimeline } from "@/lib/content";

// 애드센스 소유권 확인 메타태그는 루트 URL에만 실린다. 루트 레이아웃에 두면
// 404를 포함한 모든 라우트에 상속돼 "콘텐츠 없는 화면에 광고" 사유가 된다.
export const metadata: Metadata = {
  // www.inter.vc도 같은 내용을 200으로 서빙하므로 apex를 대표 주소로 못박는다.
  alternates: {
    canonical: "/",
  },
  other: {
    "google-adsense-account": "ca-pub-8977093633487347",
  },
};

export default function Home() {
  const services = getServices();
  const portfolio = getPortfolio();
  const timeline = getTimeline();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services services={services} />
        <Portfolio items={portfolio} />
        <Timeline entries={timeline} />
      </main>
      <Footer />
    </>
  );
}
