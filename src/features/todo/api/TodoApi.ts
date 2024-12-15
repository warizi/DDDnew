import { db } from "@shared/db";
import { Id } from "@shared/db/model/types";

const getTodoByCateId = (id: Id) => async () => {
  const res = db.todo.where("todoCateId").equals(id).toArray();

  return res;
}

export {
  getTodoByCateId
}