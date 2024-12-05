import { useMutation } from "@tanstack/react-query"
import { createTodoCategory } from "../api/todoCategoryApi"

const useCreateTodoCate = () => {
  const mutation = useMutation({
    mutationFn: createTodoCategory
  })

  return mutation;
}

export default useCreateTodoCate;
