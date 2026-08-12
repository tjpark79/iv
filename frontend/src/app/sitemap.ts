import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

/**
 * 실제로 200을 내는 URL만 올린다. 아직 만들지 않은 페이지를 미리 넣으면
 * Search Console에서 404 무더기로 잡히므로, 페이지를 추가할 때 같이 넣는다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
