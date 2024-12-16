import { useMutation } from "@tanstack/react-query"
import { updateNoteFolder } from "../api/noteFolderApi"

const useUpdateNoteFolder = () => {
  const mutation = useMutation({
    mutationFn: updateNoteFolder
  })

  return mutation;
}

export default useUpdateNoteFolder
