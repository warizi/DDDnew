import { useQuery } from "@tanstack/react-query"
import { TodoQueryKey } from "../api/todoQueryKey"
import { Id } from "@shared/db/model/types"
import { getTodoColumn } from "../api/todoColumnApi"

const useGetTodoCol = (id: Id) => {
  const query = useQuery({
    queryKey: [TodoQueryKey.todoColumn, id],
    queryFn: getTodoColumn(id)
  })

  return query;
}

export default useGetTodoCol;