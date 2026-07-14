import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo variant="light" />
        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} interVentures. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
