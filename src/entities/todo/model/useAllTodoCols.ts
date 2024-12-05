import { useQuery } from "@tanstack/react-query"
import { TodoQueryKey } from "../api/todoQueryKey"
import { getTodoColumns } from "../api/todoColumnApi"

const useAllTodoCols = () => {
  const query = useQuery({
    queryKey: [TodoQueryKey.todoColumns],
    queryFn: getTodoColumns
  });

  return query;
}

export default useAllTodoCols;