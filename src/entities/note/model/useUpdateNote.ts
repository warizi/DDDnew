import { useMutation } from "@tanstack/react-query"
import { updateNote } from "../api/noteApi"

const useUpdateNote = () => {
  const mutation = useMutation({
    mutationFn: updateNote
  })

  return mutation;
}

export default useUpdateNote;