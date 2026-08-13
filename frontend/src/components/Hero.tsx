import Link from "next/link";
import { HOME_HERO_LEAD } from "@/lib/content";

export default function Hero() {
  return (
    <header id="page-top" className="relative overflow-hidden bg-brand">
      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-balance max-w-3xl">
          Make you
          <br />
          One-in-a-Million.
        </h1>
        <p className="mt-8 max-w-xl text-white/80 leading-relaxed">
          {HOME_HERO_LEAD}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/services"
            className="rounded-md bg-white px-7 py-3 text-sm font-semibold text-brand hover:bg-white/90 transition-colors"
          >
            서비스 보기
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </div>
    </header>
  );
}
