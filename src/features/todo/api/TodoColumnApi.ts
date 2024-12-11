import { db } from "@shared/db";
import { Id } from "@shared/db/model/types";

const getTodoColumnsByCateId = (id: Id) => async () => {
  const res = db.todoColumn.where("todoCategoryId").equals(id).toArray();

  return res;
}

export {
  getTodoColumnsByCateId
}