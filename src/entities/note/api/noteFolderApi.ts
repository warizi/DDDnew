import { db, NoteFolderInputType } from "@shared/db";
import { Id, NoteFolderType } from "@shared/db/model/types";

const createNoteFolder = async (noteFolder: NoteFolderInputType) => {
  const resAll = await getNoteFolders();
  const sortByOrder = resAll.sort((a, b) => a.order - b.order);
  const lastNoteFolder = sortByOrder[resAll.length - 1];

  noteFolder.order = lastNoteFolder ? lastNoteFolder.order + 1000 : 1000;
  
  const res = db.noteFolder.add(noteFolder);

  return res;
}

const getNoteFolder = (id: Id) => async () => {
  const res = db.noteFolder.get(id);

  return res;
}

const getNoteFolders = async () => {
  const res = db.noteFolder.toArray();

  return res;
}

const updateNoteFolder = async (noteFolder: NoteFolderType) => {
  const res = db.noteFolder.update(noteFolder.id, noteFolder);

  return res;
}

const deleteNoteFolder = async (id: Id) => {
  const res = db.noteFolder.delete(id);

  return res;
}

export {
  createNoteFolder,
  getNoteFolder,
  getNoteFolders,
  updateNoteFolder,
  deleteNoteFolder,
}