import { db } from "@shared/db";
import { Id, NoteInputType, NoteType } from "@shared/db/model/types";

const createNote = async (note: NoteInputType) => {
  const resAll = await getNotes();
  const sortByOrder = resAll.sort((a, b) => a.order - b.order);
  const lastNote = sortByOrder[resAll.length - 1];

  note.order = lastNote ? lastNote.order + 1000 : 1000;

  const res = db.note.add(note);

  return res;
}

const getNote = (id: Id) => async () => {
  const res = db.note.get(id);

  return res;
}

const getNotes = async () => {
  const res = db.note.toArray();

  return res;
}

const updateNote = async (note: NoteType) => {
  const res = db.note.update(note.id, note);

  return res;
}

const deleteNote = async (id: Id) => {
  const res = db.note.delete(id);

  return res;
}

export {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
}