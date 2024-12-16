import Dexie, { EntityTable } from "dexie";
import { NoteFolderType, TodoCategoryType, TodoColumnType, TodoType } from "./types";

export const db = new Dexie("dddDatabase") as Dexie & {
  todoCategory: EntityTable<TodoCategoryType, "id">;
  todoColumn: EntityTable<TodoColumnType, "id">;
  todo: EntityTable<TodoType, "id">;
  noteFolder: EntityTable<NoteFolderType, "id">;
};

db.version(1).stores({
  todoCategory: "++id, name, order",
  todoColumn: "++id, name, todoCategoryId, order",
  todo: "++id, title, description, todoCateId, todoColumnId, priority, order, startDate, endDate",
  noteFolder: "++id, name, noteCate, order",
})

