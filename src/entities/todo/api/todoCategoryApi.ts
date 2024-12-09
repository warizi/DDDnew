import { db, TodoCategoryInputType } from "@shared/db";
import { Id, TodoCategoryType } from "@shared/db/model/types";

const getTodoCategories = async () => {
  const res = db.todoCategory.toArray();

  return res;
}

const createTodoCategory = async (todoCategory: TodoCategoryInputType) => {
  const resAll = await getTodoCategories();
  const rastTodoCate = resAll[resAll.length - 1];

  todoCategory.order = rastTodoCate ? rastTodoCate.order + 1000 : 1000;
  
  const res = db.todoCategory.add(todoCategory);

  return res;
}

const getTodoCategory = (id: Id) => async () => {
  const res = db.todoCategory.get(id);

  return res;
}

const updateTodoCategory = async (todoCategory: TodoCategoryType) => {
  const res = db.todoCategory.update(todoCategory.id, todoCategory);

  return res;
}

const deleteTodoCategory = async (id: Id) => {
  const res = db.todoCategory.delete(id);

  return res;
}

export {
  createTodoCategory,
  getTodoCategory,
  getTodoCategories,
  updateTodoCategory,
  deleteTodoCategory,
}