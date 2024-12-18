import { Id } from "@shared/db/model/types";
import useGetNoteByFolderId from "./useGetNoteByFolderId";

const useNoteSortByFolderId = (folderId: Id) => {
  const { data } = useGetNoteByFolderId(folderId);

  return data?.sort((a, b) => a.order - b.order);
}

export default useNoteSortByFolderId