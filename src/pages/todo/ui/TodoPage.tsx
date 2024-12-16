/** @jsxImportSource @emotion/react */

import { TodoHeader } from "@features/todo";
import { EditTodoModal, TodoContents } from "@widgets/todo";

export const TodoPage = () => {
  return (
    <>
      <div>
        <TodoHeader />
        <TodoContents />
      </div>
      <EditTodoModal />
    </>
  );
};