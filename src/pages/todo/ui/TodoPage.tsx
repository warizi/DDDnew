/** @jsxImportSource @emotion/react */

import { TodoHeader } from "@features/todo";
import { CreateTodoModal, TodoContents } from "@widgets/todo";

export const TodoPage = () => {
  return (
    <>
      <div>
        <TodoHeader />
        <TodoContents />
      </div>
      <CreateTodoModal />
    </>
  );
};