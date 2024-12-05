import { useMutation } from "@tanstack/react-query"
import { updateTodoCategory } from "../api/todoCategoryApi"

const useUpdateTodoCate = () => {
  const mutation = useMutation({
    mutationFn: updateTodoCategory
  })

  return mutation;
}

export default useUpdateTodoCate;