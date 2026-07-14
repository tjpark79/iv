import Image from "next/image";
import type { TimelineEntry } from "@/lib/api";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <section id="about" className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-xl mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
            대표 이력
          </h2>
        </div>

        <div className="divide-y divide-brand-border border-t border-b border-brand-border">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-6 py-7">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm mt-1">
                <Image
                  src={entry.image_url}
                  alt={entry.organization}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="w-32 shrink-0 text-sm font-mono text-muted pt-1">
                {entry.period}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{entry.organization}</h3>
                <p className="mt-1 text-sm text-muted whitespace-pre-line leading-relaxed">
                  {entry.description}
                </p>
                {entry.highlights && (
                  <ul className="mt-2 pl-4 space-y-1">
                    {entry.highlights.split("\n").filter(Boolean).map((line, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted leading-relaxed relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-brand"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
