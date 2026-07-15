import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { getPortfolio, getServices, getTimeline } from "@/lib/content";

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
