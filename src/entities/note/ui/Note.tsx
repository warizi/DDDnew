/** @jsxImportSource @emotion/react */

import { NoteDisplayEnum, NoteType } from "@shared/db/model/types";
import { useRecoilValue } from "recoil";
import { NoteStore } from "../model/NoteStore";
import { ContextMenuItem, useContextMenu } from "@shared/components/contextMenu";
import { MODAL_KEY, MODAL_TYPE, useModal } from "@shared/components/modal";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteNote from "../model/useDeleteNote";
import { NoteQueryKey } from "../model/NoteQueryKey";
import { TrashIcon } from "@shared/icon";

const Style = {
  basic: {
    backgroundColor: "#21242A",
    padding: "10px",
    cursor: "pointer",
  },
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
    width: "250px",
    height: "300px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  } as const
}

function Note({
  data,
  displayType
}: {
  data: NoteType
  displayType: NoteDisplayEnum
}) {
  const {
    title,
    content,
  } = data;
  const noteStore = useRecoilValue(NoteStore);
  const { handleContextMenu } = useContextMenu();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { mutate } = useDeleteNote();

  const handleDelete = () => {
    mutate(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.Note, noteStore.activeNoteFolderId]
        });
      }
    })
  }
  const handleOpenModal = () => {
    openModal(
      MODAL_TYPE.SLIDE_RIGHT,
      MODAL_KEY.EDIT_NOTE,
      data
    )
  }
  const contextItem = [
    <ContextMenuItem 
      key={"note-" + 1}
      icon={<TrashIcon size={18} />}
      text={"Delete"}
      onClick={() => handleDelete()}
    />
  ]
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleContextMenu(e, contextItem);
  }
  
  return (
    <div css={{...Style.basic, ...(displayType === NoteDisplayEnum.LIST ? Style.list : Style.grid)}}
      onContextMenu={handleRightClick}
      onClick={handleOpenModal}
    >
      <span>
        {title}
      </span>
      <span>
        {content}
      </span>
    </div>
  );
};

export default Note;