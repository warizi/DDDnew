/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { TodoCol } from "@entities/todo";
import { TodoColumnType } from "@shared/db";
import { Id, TodoType } from "@shared/db/model/types";
import CreateTodoBtn from "./CreateTodoBtn";
import ListTodoByColId from "./ListTodoByColId";
import { formatSortableId } from "../model/formatSortableId";

const Style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "start",
  gap: "10px",
  height: "calc(100vh - 150px)",
} as const;

function ListTodoColByCateId({
  todoCols,
  todos,
}: {
  todoCols: TodoColumnType[]
  todos: TodoType[]
}) {
  const filteredTodoColIds = todoCols.map((col) => formatSortableId(col.id, "todoCol"));


  return (
    <div css={Style}>
      <SortableContext items={filteredTodoColIds}>
        {
          todoCols?.map((col) => (
            <TodoCol 
              key={col.id} 
              data={col}
              addTodoBtn={<CreateTodoBtn todoColumnId={col.id}/>}
            >
              <ListTodoByColId 
                todos={todos.filter((todo) => todo.todoColumnId === col.id)} 
              />
            </TodoCol>
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListTodoColByCateId;