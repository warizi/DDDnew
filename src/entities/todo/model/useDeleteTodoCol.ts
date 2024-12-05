import { useMutation } from "@tanstack/react-query"
import { deleteTodoColumn } from "../api/todoColumnApi"

const useDeleteTodoCol = () => {
  const mutation = useMutation({
    mutationFn: deleteTodoColumn
  })

  return mutation;
}

export default useDeleteTodoCol;