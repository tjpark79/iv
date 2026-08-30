/**
 * 페이지 메타데이터를 한곳에서 만든다.
 *
 * Next.js는 metadata를 **얕게** 병합한다. 하위 세그먼트가 openGraph를 정의하면
 * 루트의 openGraph는 통째로 교체되고, 파일 규약(opengraph-image.png)으로 붙던
 * 이미지도 같이 사라진다. 페이지마다 손으로 채우면 빠뜨리기 쉬워서, og·twitter를
 * 항상 함께 만들어 주는 함수를 두고 모든 페이지가 이걸 쓴다.
 *
 * 이미지는 public/og.png를 직접 가리킨다. 파일 규약을 쓰지 않는 이유는 위와 같다 —
 * openGraph를 정의하는 페이지에는 어차피 상속되지 않아 주소를 알아야 한다.
 */

import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/** 1200x630. 카카오톡·슬랙·X가 모두 이 비율의 큰 카드를 쓴다. */
const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "interVentures — Make you One-in-a-Million.",
};

type PageMeta = {
  /** <title>과 카드 제목. 사이트명은 호출부에서 붙인다. */
  title: string;
  description: string;
  /**
   * canonical과 og:url. 실제 주소가 있는 페이지만 넘긴다.
   * 루트 레이아웃과 404는 비워 둔다 — 없는 주소에 canonical을 붙이면
   * 404가 홈의 사본이라고 알리는 셈이 된다.
   */
  path?: string;
  /** 글은 article, 나머지는 website. */
  type?: "website" | "article";
  /** article일 때만. YYYY-MM-DD. */
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMeta): Metadata {
  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "ko_KR",
      title,
      description,
      images: [OG_IMAGE],
      ...(path ? { url: path } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
