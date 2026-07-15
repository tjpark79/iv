import { makeCrudHandlers } from "@/lib/adminCrud";

export const { GET, POST } = makeCrudHandlers("services", ["order", "icon", "title", "description"]);
