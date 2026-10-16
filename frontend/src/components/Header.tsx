"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/about", label: "회사 소개" },
  { href: "/services", label: "서비스" },
  { href: "/collection", label: "모음집" },
  { href: "/insights", label: "인사이트" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // 헤더·푸터 바탕은 브랜드 초록으로 고정한다 (P/CLAUDE.md 공통 규칙).
  return (
    <header className="sticky top-0 z-50 bg-brand border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/#page-top">
          <Logo variant="light" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-white/15 bg-brand px-6 py-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
