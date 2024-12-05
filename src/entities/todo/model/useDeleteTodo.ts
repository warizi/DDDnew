import { useMutation } from "@tanstack/react-query"
import { deleteTodo } from "../api/todoApi"

const useDeleteTodo = () => {
  const mutation = useMutation({
    mutationFn: deleteTodo
  });

  return mutation;
}


export default useDeleteTodo;