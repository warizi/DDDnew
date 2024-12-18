import { useMutation } from "@tanstack/react-query"
import { createNote } from "../api/noteApi"

const useCreateNote = () => {
  const mutate = useMutation({
    mutationFn: createNote
  })

  return mutate;
}

export default useCreateNote;