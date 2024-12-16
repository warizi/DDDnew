import { atom } from "recoil";

export enum NoteCategoryEnum {
  PROJECT = "PROJECT",
  AREA = "AREA",
  RESOURCE = "RECOURCE",
  ARCHIVE = "ARCHIVE",
}

export const NoteStore = atom({
  key: "NoteStore",
  default: {
    activeNoteCategory: NoteCategoryEnum.PROJECT,
  },
})