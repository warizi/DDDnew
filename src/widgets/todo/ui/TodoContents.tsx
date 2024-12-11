/** @jsxImportSource @emotion/react */

import { ListTodoColByCateId } from "@features/todo";
import useListTodoColDnD from "../model/useListTodoColDnD";
import { useRecoilValue } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { TodoCol } from "@entities/todo";
import { TodoColumnType } from "@shared/db";

const Style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  height: "calc(100vh - 50px)",
  padding: "20px",
  overflowX: "auto",
} as const;

function TodoContents() {
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);
  const {
    todoCols,
    todoColIds,
    handleDragEnd,
    handleDragStart,
    sensors,
    activeTodoCol
  } = useListTodoColDnD(selectedTodoCate.id);
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div css={Style}>
        <ListTodoColByCateId 
          todoCols={todoCols}
          todoColIds={todoColIds}
        />
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeTodoCol &&
              <TodoCol data={todoCols.find((col) => col.id === activeTodoCol.id) as TodoColumnType} />
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default TodoContents;