import { makeItemCrudHandlers } from "@/lib/adminCrud";

export const { PUT, DELETE } = makeItemCrudHandlers("services", [
  "order",
  "icon",
  "title",
  "description",
]);
