import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | 인터벤처스",
  description:
    "요청하신 주소의 페이지가 없습니다. 인터벤처스 홈에서 필요한 정보를 찾아보세요.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl w-full px-6 py-24">
          <p className="text-sm font-semibold tracking-widest text-brand">404</p>
          <h1 className="section-heading mt-3 text-3xl sm:text-4xl font-bold">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            요청하신 주소가 변경되었거나 삭제되었습니다. 아래 링크에서 원하시는
            내용을 이어서 찾아보실 수 있습니다.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-sm">
            <li>
              <Link
                href="/"
                className="font-medium text-brand hover:text-brand-dark transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </li>
            <li>
              <Link
                href="/#services"
                className="font-medium text-brand hover:text-brand-dark transition-colors"
              >
                인터벤처스가 하는 일
              </Link>
            </li>
            <li>
              <Link
                href="/#portfolio"
                className="font-medium text-brand hover:text-brand-dark transition-colors"
              >
                서비스 살펴보기
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
