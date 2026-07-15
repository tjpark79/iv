import type { Service } from "@/lib/content";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-foreground">
            우리의 Vision
          </h2>
          <p className="mt-4 text-muted text-lg">
            대한민국 국가경쟁력을 선도할 기업들과 함께 뛰겠습니다.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.id} className="border-t border-brand-border pt-6">
              <span className="text-sm font-mono text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted whitespace-pre-line leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
