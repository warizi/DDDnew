import { Id } from "@shared/db/model/types";
import { NoteQueryKey } from "./NoteQueryKey";
import { getNoteFolder } from "../api/noteFolderApi";
import { useQuery } from "@tanstack/react-query";

const useGetNoteFolder = (noteId: Id) => {
  const query = useQuery({
    queryKey: [NoteQueryKey.NoteFolder, noteId],
    queryFn: getNoteFolder(noteId)
  })

  return query
}

export default useGetNoteFolder
