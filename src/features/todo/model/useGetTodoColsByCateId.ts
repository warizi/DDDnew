import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { Id } from "@shared/db/model/types";
import { useQuery } from "@tanstack/react-query";
import { getTodoColumnsByCateId } from "../api/TodoColumnApi";

const useGetTodoColsByCateId = (id: Id) => {
  const { data } = useQuery({
    queryKey: [TodoQueryKey.todoColumns, id],
    queryFn: getTodoColumnsByCateId(id)
  });

  return data?.sort((a, b) => a.order - b.order);
}

export default useGetTodoColsByCateId;