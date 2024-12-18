import useNoteSortByFolderId from "@features/note/model/useNoteSortByFolderId";
import { Id, NoteType } from "@shared/db/model/types";
import { useEffect, useState } from "react";

const useNoteDnd = (folderId: Id) => {
  const data = useNoteSortByFolderId(folderId);
  const [ noteList, setNoteList ] = useState<NoteType[]>([]);

  useEffect(() => {
    if (data) {
      setNoteList(data)
    }
  }, [data])
  return {
    noteList,
    setNoteList
  }
}

export default useNoteDnd
