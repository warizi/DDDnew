import { db } from "@shared/db";
import { Id } from "@shared/db/model/types";

const getNotesByFolderId = (folderId: Id) => async () => {
  const res = db.note.where("noteFolderId").equals(folderId).toArray();

  return res;
}

export {
  getNotesByFolderId
}
