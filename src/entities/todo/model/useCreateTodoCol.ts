import { useMutation } from "@tanstack/react-query"
import { createTodoColumn } from "../api/todoColumnApi"

const useCreateTodoCol = () => {
  const mutation = useMutation({
    mutationFn: createTodoColumn
  })

  return mutation;
}

export default useCreateTodoCol;