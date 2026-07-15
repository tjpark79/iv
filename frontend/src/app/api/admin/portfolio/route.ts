import { makeCrudHandlers } from "@/lib/adminCrud";

export const { GET, POST } = makeCrudHandlers("portfolio_items", [
  "order",
  "title",
  "summary",
  "description",
  "category",
  "duration",
  "thumbnail_url",
  "full_image_url",
]);
