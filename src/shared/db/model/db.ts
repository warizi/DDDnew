import Dexie, { EntityTable } from "dexie";
import { TodoCategoryType, TodoColumnType, TodoType } from "./types";

export const db = new Dexie("dddDatabase") as Dexie & {
  todoCategory: EntityTable<TodoCategoryType, "id">;
  todoColumn: EntityTable<TodoColumnType, "id">;
  todo: EntityTable<TodoType, "id">;
};

db.version(1).stores({
  todoCategory: "++id, name, order",
  todoColumn: "++id, name, todoCategoryId, order",
  todo: "++id, title, description, todoColumnId, priority, order, startDate, endDate"
})

