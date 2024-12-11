/** @jsxImportSource @emotion/react */

import { useCreateTodoCate } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { TodoCategoryInputType } from "@shared/db";
import { PlusIcon } from "@shared/icon";
import { useQueryClient } from "@tanstack/react-query";
import { CreateTodoCateBtnStyle } from "./CreateTodoCateBtn.style";

function CreateTodoCateBtn() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateTodoCate();

  const data: TodoCategoryInputType = {
    name: "New Category",
    order: 0
  }
  const handleCreateTodoCate = () => {
    mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TodoQueryKey.todoCategories]
          })
        }
      }
    )
  }
  return (
    <button
      css={CreateTodoCateBtnStyle}
      onClick={handleCreateTodoCate}
      disabled={isPending}
    >
      <div>
        <PlusIcon />
      </div>
      Add Todo Category
    </button>
  );
};

export default CreateTodoCateBtn;