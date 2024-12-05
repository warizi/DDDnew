import { useQuery } from "@tanstack/react-query"
import { TodoQueryKey } from "../api/todoQueryKey"
import { getTodos } from "../api/todoApi"

const useAllTodos = () => {
  const query = useQuery( {
    queryKey: [TodoQueryKey.todos],
    queryFn: getTodos
  })

  return query;
}

export default useAllTodos;