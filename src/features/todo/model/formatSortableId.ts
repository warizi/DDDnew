import { Id } from "@shared/db/model/types";

export function formatSortableId(id?: Id, type?: "todo" | "todoCol") {
  if (!id || !type) return "";
  return Number(id + (type === "todo" ? "10" : "20"));
}