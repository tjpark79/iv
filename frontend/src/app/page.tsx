import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { getPortfolio, getServices, getTimeline } from "@/lib/content";

// DB 내용은 관리자 API로 언제든 바뀔 수 있으므로 빌드 시점 정적 캐싱을 막는다.
export const dynamic = "force-dynamic";

export default async function Home() {
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
