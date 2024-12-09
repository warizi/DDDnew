import { useAllTodoCates } from "@entities/todo";

const useAllTodoCatesSort = () => {
  const { data } = useAllTodoCates();

  return data?.sort((a, b) => a.order - b.order);
}

export default useAllTodoCatesSort;