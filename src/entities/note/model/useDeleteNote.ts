import { useMutation } from "@tanstack/react-query"
import { deleteNote } from "../api/noteApi"

const useDeleteNote = () => {
  const mutation = useMutation({
    mutationFn: deleteNote
  })

  return mutation;
}

export default useDeleteNote;