/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { Todo } from "@entities/todo";
import { TodoType } from "@shared/db";
import { Id } from "@shared/db/model/types";
import { formatSortableId } from "../model/formatSortableId";

const Style = { 
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  } as const,
}

function ListTodoByColId({
  todos,
}: {
  todos: TodoType[]
}) {
  const filteredTodoIds = todos.map((todo) => formatSortableId(todo.id, "todo"));
  return (
    <div css={Style.container}>
      <SortableContext items={filteredTodoIds}>
        {
          todos?.map((todo) => (
            <Todo
              key={todo.id}
              data={todo}
            />
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListTodoByColId;