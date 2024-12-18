import { Id } from "@shared/db/model/types";
import { useQuery } from "@tanstack/react-query";
import { NoteQueryKey } from "./NoteQueryKey";
import { getNote } from "../api/noteApi";

const useGetNote = (id: Id) => {
  const query = useQuery({
    queryKey: [NoteQueryKey.Note, id],
    queryFn: getNote(id)
  })

  return query
}

export default useGetNote