import { useMutation } from "@tanstack/react-query"
import { updateTodo } from "../api/todoApi"

const useUpdateTodo = () => {
  const mutation = useMutation({
    mutationFn: updateTodo
  });

  return mutation;
}

export default useUpdateTodo;