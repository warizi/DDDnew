import { NoteCategoryEnum } from "@entities/note";
import { db } from "@shared/db";

const getNoteFolderByCate = (cate: NoteCategoryEnum) => async () => {
  const res = db.noteFolder.where("noteCate").equals(cate).toArray();

  return res;
}

export {
  getNoteFolderByCate
}
