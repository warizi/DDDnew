import Dexie, { EntityTable } from "dexie";
import { NoteFolderType, NoteType, TodoCategoryType, TodoColumnType, TodoType } from "./types";

export const db = new Dexie("dddDatabase") as Dexie & {
  todoCategory: EntityTable<TodoCategoryType, "id">;
  todoColumn: EntityTable<TodoColumnType, "id">;
  todo: EntityTable<TodoType, "id">;
  noteFolder: EntityTable<NoteFolderType, "id">;
  note: EntityTable<NoteType, "id">;
};

db.version(1).stores({
  todoCategory: "++id, name, order",
  todoColumn: "++id, name, todoCategoryId, order",
  todo: "++id, title, description, todoCateId, todoColumnId, priority, order, startDate, endDate",
  noteFolder: "++id, name, noteCate, order",
  note: "++id, title, content, noteCate, noteFolderId, order",
})
