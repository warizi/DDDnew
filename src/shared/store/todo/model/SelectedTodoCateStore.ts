import { TodoCategoryType } from "@shared/db";
import { atom } from "recoil";

const SelectedTodoCateStore = atom({
  key: "SelectedTodoCateStore",
  default: {} as TodoCategoryType,
})

export default SelectedTodoCateStore;