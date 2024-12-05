import { useMutation } from "@tanstack/react-query"
import { deleteTodoCategory } from "../api/todoCategoryApi"

const useDeleteTodoCate = () => {
  const mutation = useMutation({
    mutationFn: deleteTodoCategory
  })

  return mutation;
}

export default useDeleteTodoCate;