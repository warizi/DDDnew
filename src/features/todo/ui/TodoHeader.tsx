/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import { TodoHeaderStyle } from "./TodoHeader.style";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import CreateTodoColBtn from "./CreateTodoColBtn";

function TodoHeader() {
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);
  return (
    <div css={TodoHeaderStyle.header}>
      <h2 css={TodoHeaderStyle.title}>{selectedTodoCate.name}</h2>
      <CreateTodoColBtn />
    </div>
  );
};

export default TodoHeader;