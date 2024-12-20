import useNoteSortByFolderId from "@features/note/model/useNoteSortByFolderId";
import { Id, NoteType } from "@shared/db/model/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useUpdateNote from "./useUpdateNote";

const useNoteDnd = (folderId: Id) => {
  const data = useNoteSortByFolderId(folderId);
  const [ noteList, setNoteList ] = useState<NoteType[]>([]);
  const queryClient = useQueryClient();
  const { mutate } = useUpdateNote();

  useEffect(() => {
    if (data) {
      setNoteList(data)
    } else {
      setNoteList([])
    }
  }, [data])
  return {
    noteList,
    setNoteList
  }
}