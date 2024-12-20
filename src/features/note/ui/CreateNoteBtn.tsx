/** @jsxImportSource @emotion/react */

import { NoteStore, useCreateNote } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import { NoteDisplayEnum, NoteInputType } from "@shared/db/model/types";
import { PlusIcon } from "@shared/icon";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const Style = {
  basic: {
    backgroundColor: "#21242A",
    border: "none",
    stroke: "#B4B4B4",
    cursor: "pointer",
    color: "#B4B4B4",
    ":hover": {
      color: "#fff",
      stroke: "#fff",
    }
  },
  constainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  } as const,
  list: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "35px",
    lineHeight: "35px",
    padding: "0 20px",
  } as const,
  grid: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "150px",
    maxWidth: "250px",
    height: "300px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.8)",
  } as const
}

function CreateNoteBtn({
  displayType
}: {
  displayType: NoteDisplayEnum
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNote();
  const { activeNoteCategory, activeNoteFolderId } = useRecoilValue(NoteStore);

  const data: NoteInputType = {
    title: "New Note",
    content: "",
    noteCate: activeNoteCategory,
    noteFolderId: activeNoteFolderId,
    order: 0,
  }

  const handleCreateNote = () => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.Note, activeNoteFolderId]
        })
      }
    })
  }
  return (
    <button css={{...Style.basic, ...(displayType === NoteDisplayEnum.LIST ? Style.list : Style.grid)}}
      onClick={handleCreateNote}
      disabled={isPending}
    >
      <div css={{...Style.constainer}}>
        <div>
          <PlusIcon />
        </div>
        Add Note
      </div>
    </button>
  );
};

export default CreateNoteBtn;