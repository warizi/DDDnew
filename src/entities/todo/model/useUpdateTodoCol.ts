import { useMutation } from "@tanstack/react-query"
import { updateTodoColumn } from "../api/todoColumnApi"

const useUpdateTodoCol = () => {
  const mutation = useMutation({
    mutationFn: updateTodoColumn
  });

  return mutation;
}

export default useUpdateTodoCol;