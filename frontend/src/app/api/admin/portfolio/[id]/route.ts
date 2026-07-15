import { makeItemCrudHandlers } from "@/lib/adminCrud";

export const { PUT, DELETE } = makeItemCrudHandlers("portfolio_items", [
  "order",
  "title",
  "summary",
  "description",
  "category",
  "duration",
  "thumbnail_url",
  "full_image_url",
]);
