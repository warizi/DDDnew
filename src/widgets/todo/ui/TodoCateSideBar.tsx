/** @jsxImportSource @emotion/react */

import { CreateTodoCateBtn, ListTodoCate } from "@features/todo";
import { TodoCateSideBarStyle } from "./TodoCateSideBar.style";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import useListTodoDnd from "../model/useListTodoDnD";
import { createPortal } from "react-dom";
import { TodoCate } from "@entities/todo";
import { TodoCategoryInputType, TodoCategoryType } from "@shared/db";

function TodoCateSideBar() {
  const {
    todoCates,
    todoCateIds,
    handleDragStart,
    sensors,
    handleDragEnd,
    activeTodoCate
  } = useListTodoDnd();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div css={TodoCateSideBarStyle.container}>
        <div>
          <ListTodoCate data={todoCates} todoCateIds={todoCateIds}/>
        </div>
        <CreateTodoCateBtn />
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeTodoCate && 
              <TodoCate data={todoCates.find((cate) => cate.id === activeTodoCate.id) as TodoCategoryType} />
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default TodoCateSideBar;