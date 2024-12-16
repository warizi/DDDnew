import { useMutation } from "@tanstack/react-query"
import { createNoteFolder } from "../api/noteFolderApi"

const useCreateNoteFolder = () => {
  const mutation = useMutation({
    mutationFn: createNoteFolder
  });

  return mutation;
}

export default useCreateNoteFolder;
