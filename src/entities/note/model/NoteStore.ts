import { Id } from "@shared/db/model/types";
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
    activeNoteFolderId: "",
  } as {
    activeNoteCategory: NoteCategoryEnum;
    activeNoteFolderId: Id;
  },
})