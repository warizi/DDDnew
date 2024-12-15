import { formatSortableId } from "@features/todo/model/formatSortableId";
import { Id } from "@shared/db/model/types";

export const calcOrder = (newArray: any[], activeId: Id, type: "todo" | "todoCol") => {
  const newIndex = newArray.findIndex((cate) => formatSortableId(cate.id, type) === activeId);
      
  const newPrevOrder = newArray[newIndex - 1]?.order ?? 0;
  const newNextOrder = newArray[newIndex + 1]?.order ?? newPrevOrder + 2000;

  const newOrder = (newPrevOrder + newNextOrder) / 2;

  return {
    ...newArray[newIndex],
    order: newOrder
  }
}

