import { useMutation } from "@tanstack/react-query"
import { createTodo } from "../api/todoApi"

const useCreateTodo = () => {
  const mutation = useMutation({
    mutationFn: createTodo
  })

  return mutation
}

export default useCreateTodo