import { useQuery } from "@tanstack/react-query"
import { TodoQueryKey } from "../api/todoQueryKey"
import { getTodoCategory } from "../api/todoCategoryApi"
import { Id } from "@shared/db/model/types"

const useGetTodoCate = (id: Id) => {
  const query = useQuery({
    queryKey: [TodoQueryKey.todoCategory, id],
    queryFn: getTodoCategory(id)
  })

  return query;
}

export default useGetTodoCate;