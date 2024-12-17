import { NoteCategoryEnum } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import { useQuery } from "@tanstack/react-query";
import { getNoteFolderByCate } from "../api/noteFolderApi";

const useGetNoteFolderByCate = (cate: NoteCategoryEnum) => {
  const query = useQuery({
    queryKey: [NoteQueryKey.NoteFolder, cate],
    queryFn: getNoteFolderByCate(cate)
  });

  return query;
}

export default useGetNoteFolderByCate;
