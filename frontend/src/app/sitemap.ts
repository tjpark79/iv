import type { MetadataRoute } from "next";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";

/**
 * 실제로 200을 내는 URL만 올린다. 아직 만들지 않은 페이지를 미리 넣으면
 * Search Console에서 404 무더기로 잡히므로, 페이지를 추가할 때 같이 넣는다.
 * 인사이트 글은 content/insights를 읽어 자동으로 들어간다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const posts: MetadataRoute.Sitemap = getAllInsights().map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
