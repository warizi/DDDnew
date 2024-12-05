import { useQuery } from "@tanstack/react-query"
import { getTodo } from "../api/todoApi"
import { Id } from "@shared/db/model/types"
import { TodoQueryKey } from "../api/todoQueryKey"

const useGetTodo = (id: Id) => {
  const query = useQuery({
    queryKey: [TodoQueryKey.todo, id],
    queryFn: getTodo(id)
  })

  return query
}

export default useGetTodo