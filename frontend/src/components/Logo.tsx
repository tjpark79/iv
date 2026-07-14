export default function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";
  return (
    <span
      className={`inline-flex items-center text-lg font-bold tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-wordmark)" }}
    >
      <span className={isLight ? "text-white" : "text-brand"}>inter</span>
      <span className={isLight ? "bg-white text-brand px-1.5" : "bg-brand text-white px-1.5"}>
        Ventures
      </span>
    </span>
  );
}
