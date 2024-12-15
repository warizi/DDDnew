import { db, TodoInputType, TodoType } from "@shared/db";
import { Id } from "@shared/db/model/types";

const createTodo = async (todo: TodoInputType) => {
  const resAll = await getTodos();
  const sortByOrder = resAll.sort((a, b) => a.order - b.order);
  const lastTodo = sortByOrder[resAll.length - 1];

  todo.order = lastTodo ? lastTodo.order + 1000 : 1000;
  
  const res = db.todo.add(todo);

  return res;
}

const getTodo = (id: Id) => async () => {
  const res = db.todo.get(id);

  return res;
}

const getTodos = async () => {
  const res = db.todo.toArray();

  return res;
}

const updateTodo = async (todo: TodoType) => {
  const res = db.todo.update(todo.id, todo);

  return res;
}

const deleteTodo = async (id: Id) => {
  const res = db.todo.delete(id);

  return res;
}

export {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}