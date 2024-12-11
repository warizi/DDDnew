/** @jsxImportSource @emotion/react */

import { useCreateTodoCol } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { TodoColumnInputType } from "@shared/db";
import { PlusIcon } from "@shared/icon";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const Style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: "10px",
    width: '200px',
    height: '50px',
    cursor: 'pointer',
    color: '#B4B4B4',
    stroke: '#B4B4B4',
    backgroundColor: "#424B5B",
    border: "none",
    ":hover": {
      color: "#fff",
      stroke: "#fff",
    }
  }
}

function CreateTodoColBtn() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateTodoCol();
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);
  

  const data: TodoColumnInputType = {
    name: "New Column",
    todoCategoryId: selectedTodoCate.id,
    order: 0
  }

  const handleCreateTodoCol = () => {
    mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TodoQueryKey.todoColumns, selectedTodoCate.id]
          })
        }
      }
    )
  }

  return (
    <button css={Style.container}
      onClick={handleCreateTodoCol}
      disabled={isPending}
    >
      <PlusIcon />
      Add Todo Column
    </button>
  );
};

export default CreateTodoColBtn;