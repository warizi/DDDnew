import { db, TodoColumnInputType } from "@shared/db";
import { Id, TodoColumnType } from "@shared/db/model/types";

const createTodoColumn = async (todoColumn: TodoColumnInputType) => {
  const res = db.todoColumn.add(todoColumn);

  return res;
}

const getTodoColumn = (id: Id) => async () => {
  const res = db.todoColumn.get(id);

  return res;
}

const getTodoColumns = async () => {
  const res = db.todoColumn.toArray();

  return res;
}

const updateTodoColumn = async (todoColumn: TodoColumnType) => {
  const res = db.todoColumn.update(todoColumn.id, todoColumn);

  return res;
}

const deleteTodoColumn = async (id: Id) => {
  const res = db.todoColumn.delete(id);

  return res;
}

export {
  createTodoColumn,
  getTodoColumn,
  getTodoColumns,
  updateTodoColumn,
  deleteTodoColumn,
}