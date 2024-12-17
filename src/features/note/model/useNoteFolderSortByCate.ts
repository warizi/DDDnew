import { NoteCategoryEnum } from "@entities/note";
import useGetNoteFolderByCate from "./useGetNoteFolderByCate";

const useNoteFolderSortByCate = (cate: NoteCategoryEnum) => {
  const { data } = useGetNoteFolderByCate(cate);

  return data?.sort((a, b) => a.order - b.order);
}

export default useNoteFolderSortByCate;