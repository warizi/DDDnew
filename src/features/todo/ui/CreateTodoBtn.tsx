/** @jsxImportSource @emotion/react */

import { Id, TodoInputType } from "@shared/db/model/types";
import { PlusIcon } from "@shared/icon";
import { useCreateTodo } from "@entities/todo";
import { useQueryClient } from "@tanstack/react-query";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { useRecoilValue } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";

const Style = {
  width: "100%",
  height: "30px",
  backgroundColor: "#424B5B",
  color: "#B4B4B4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  stroke: "#B4B4B4",
  border: "none",
  cursor: "pointer",
  ":hover": {
    color: "#fff",
    stroke: "#fff",
  }
}

function CreateTodoBtn({
  todoColumnId
}: {
  todoColumnId: Id;
}) {
  // const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { mutate } = useCreateTodo();
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);

  const handelCreate = () => {
    const newTodo: TodoInputType = {
      title: "New Todo",
      todoCateId: selectedTodoCate.id,
      todoColumnId,
      order: 0
    }

    mutate(newTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todos, selectedTodoCate.id]
        })
      }
    })
  }
  return (
    <>
      <div css={Style}
        onClick={handelCreate}
        // onClick={() => openModal(MODAL_TYPE.SLIDE_RIGHT, MODAL_KEY.CREATE_TODO, { todoColumnId })}
      >
        <PlusIcon />
        Create Todo
      </div>
    </>
  );
};

export default CreateTodoBtn;