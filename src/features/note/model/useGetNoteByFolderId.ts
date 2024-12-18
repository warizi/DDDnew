import { Id } from "@shared/db/model/types";
import { useQuery } from "@tanstack/react-query";
import { getNotesByFolderId } from "../api/noteApi";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";

const useGetNoteByFolderId = (folderId: Id) => {
  const query = useQuery({
    queryKey: [NoteQueryKey.Note, folderId],
    queryFn: getNotesByFolderId(folderId)
  })

  return query
}

export default useGetNoteByFolderId