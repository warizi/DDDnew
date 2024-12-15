/** @jsxImportSource @emotion/react */

import { CreateTodoBtn, ListTodoColByCateId } from "@features/todo";
import useListTodoColDnD from "../model/useListTodoColDnD";
import { useRecoilValue } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { Todo, TodoCol } from "@entities/todo";
import { TodoColumnType } from "@shared/db";
import ListTodoByColId from "@features/todo/ui/ListTodoByColId";

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
    todos,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    sensors,
    activeTodoCol,
    activeTodo
  } = useListTodoColDnD(selectedTodoCate.id);
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <div css={Style}>
        <ListTodoColByCateId 
          todoCols={todoCols}
          todos={todos}
        />
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeTodoCol &&
              <TodoCol 
                data={todoCols.find((col) => col.id === activeTodoCol.id) as TodoColumnType} 
                addTodoBtn={<CreateTodoBtn todoColumnId={activeTodoCol.id}/>}
              >
                <ListTodoByColId
                  todos={todos.filter((todo) => todo.todoColumnId === activeTodoCol.id)} 
                />
              </TodoCol>
            }
            {
              activeTodo && 
              <Todo data={activeTodo} />
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default TodoContents;