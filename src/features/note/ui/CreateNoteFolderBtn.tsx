/** @jsxImportSource @emotion/react */

import { NoteStore } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import useCreateNoteFolder from "@entities/note/model/useCreateNoteFolder";
import { NoteFolderInputType } from "@shared/db";
import { PlusIcon } from "@shared/icon";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const Style = {
  button: {
    width: "100%",
    height: "40px",
    backgroundColor: "#424B5B",
    color: "#B4B4B4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    stroke: "#B4B4B4",
    border: "none",
    cursor: "pointer",
    ":hover": {
      color: "#fff",
      stroke: "#fff",
    }
  }
}

function CreateNoteFolderBtn() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNoteFolder();
  const noteStore = useRecoilValue(NoteStore);

  const data: NoteFolderInputType = {
    name: "New Folder",
    noteCate: noteStore.activeNoteCategory,
    order: 0,
  }

  const handleCreateNoteFolder = () => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.NoteFolder, noteStore.activeNoteCategory]
        })
      }
    })
  }
  return (
    <button 
      css={{...Style.button}}
      onClick={handleCreateNoteFolder}
      disabled={isPending}
    >
      <div>
        <PlusIcon />
      </div>
      Add Folder
    </button>
  );
};

export default CreateNoteFolderBtn;