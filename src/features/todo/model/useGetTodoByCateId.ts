import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { Id } from "@shared/db/model/types";
import { getTodoByCateId } from "../api/TodoApi";
import { useQuery } from "@tanstack/react-query";

const useGetTodoByCateId = (id: Id) => {
  const { data } = useQuery({
    queryKey: [TodoQueryKey.todos, id],
    queryFn: getTodoByCateId(id)
  });

  return data?.sort((a, b) => a.order - b.order);
}

export default useGetTodoByCateId;