import { useQuery } from "@tanstack/react-query"
import { TodoQueryKey } from "../api/todoQueryKey"
import { getTodoCategories } from "../api/todoCategoryApi"

const useAllTodoCates = () => {
  const query = useQuery({
    queryKey: [TodoQueryKey.todoCategories],
    queryFn: getTodoCategories
  })

  return query; 
}

export default useAllTodoCates;