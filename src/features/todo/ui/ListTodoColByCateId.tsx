/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { TodoCol } from "@entities/todo";
import { TodoColumnType } from "@shared/db";
import { Id } from "@shared/db/model/types";
import CreateTodoBtn from "./CreateTodoBtn";

const Style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
} as const;

function ListTodoColByCateId({
  todoCols,
  todoColIds
}: {
  todoCols: TodoColumnType[]
  todoColIds: Id[]
}) {


  return (
    <div css={Style}>
      <SortableContext items={todoColIds}>
        {
          todoCols?.map((col) => (
            <TodoCol key={col.id} data={col}>
              <div>todo</div>
              <CreateTodoBtn todoColumnId={col.id}/>
            </TodoCol>
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListTodoColByCateId;