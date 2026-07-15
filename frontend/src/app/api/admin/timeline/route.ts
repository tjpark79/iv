import { makeCrudHandlers } from "@/lib/adminCrud";

export const { GET, POST } = makeCrudHandlers("timeline_entries", [
  "order",
  "period",
  "organization",
  "description",
  "highlights",
  "image_url",
]);
