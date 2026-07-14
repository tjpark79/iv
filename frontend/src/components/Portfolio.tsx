"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { PortfolioItem } from "@/lib/api";

export default function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-brand-light">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-xl mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
            서비스
          </h2>
        </div>

        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {items.map((item, i) => {
            const expanded = expandedId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className="w-full flex items-center gap-6 py-6 text-left group"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      priority={i === 0}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.summary}</p>
                  </div>
                  <Plus
                    size={18}
                    className={`shrink-0 text-brand transition-transform ${
                      expanded ? "rotate-45" : ""
                    }`}
                  />
                </button>

                {expanded && (
                  <div className="pb-8 pl-[7.5rem] text-sm text-muted space-y-3">
                    <p className="leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-brand font-medium">
                      <span>업무기간: {item.duration}</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
