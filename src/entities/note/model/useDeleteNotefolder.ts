import { useMutation } from "@tanstack/react-query"
import { deleteNoteFolder } from "../api/noteFolderApi"

const useDeleteNotefolder = () => {
  const mutation = useMutation({
    mutationFn: deleteNoteFolder
  })

  return mutation;
}

export default useDeleteNotefolder
