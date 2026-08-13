import Link from "next/link";
import Logo from "./Logo";
import { BUSINESS } from "@/lib/site";

const SITE_LINKS = [
  { href: "/about", label: "회사 소개" },
  { href: "/services", label: "서비스" },
  { href: "/collection", label: "모음집" },
  { href: "/insights", label: "인사이트" },
  { href: "/contact", label: "문의" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
];

export default function Footer() {
  return (
    <footer className="bg-brand py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo variant="light" />
            <address className="mt-5 not-italic text-sm text-white/60 leading-relaxed">
              {BUSINESS.legalName} · 대표 {BUSINESS.ceo}
              <br />
              사업자등록번호 {BUSINESS.registrationNumber}
              <br />
              {BUSINESS.address}
              <br />
              <a
                href={`mailto:${BUSINESS.email}`}
                className="hover:text-white transition-colors"
              >
                {BUSINESS.email}
              </a>
            </address>
          </div>

          <nav className="flex gap-14" aria-label="푸터">
            <ul className="space-y-2.5 text-sm">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 전 페이지가 빌드 시점에 정적 생성되므로 new Date()를 쓰면 배포한 해에
            연도가 고정된다. 해가 바뀌어도 틀리지 않도록 연도를 넣지 않는다. */}
        <p className="mt-12 border-t border-white/15 pt-6 text-sm text-white/50">
          &copy; interVentures. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
