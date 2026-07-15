import { makeItemCrudHandlers } from "@/lib/adminCrud";

export const { PUT, DELETE } = makeItemCrudHandlers("timeline_entries", [
  "order",
  "period",
  "organization",
  "description",
  "highlights",
  "image_url",
]);
