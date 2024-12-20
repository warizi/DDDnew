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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CommonEditor } from "@shared/components/editor";

const Style = {
  basic: {
    backgroundColor: "#21242A",
    padding: "15px",
    cursor: "pointer",
    color: "#B4B4B4",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#5C6B8A",
      color: "white"
    }
  },
  contentContainer: {
    width: "90%",
    borderRadius: "5px",
    padding: "5px",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "45px",
    lineHeight: "45px",
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
  } as const,
  isDragging: {
    backgroundColor: "#5C6B8A",
    border: "1px dashed #B4B4B4",
    opacity: 0.5
  } as const,
  title: {
    marginBottom: "10px",
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

  
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: "note",
      note: data
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    // zIndex: isDragging ? 1000 : 10
  }

  if(isDragging) {
    return (
      <div css={{...Style.basic, ...(displayType === NoteDisplayEnum.LIST ? Style.list : Style.grid), ...Style.isDragging}}
        onContextMenu={handleRightClick}
        onClick={handleOpenModal}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
      </div>
    )
  }
  return (
    <div css={{...Style.basic, ...(displayType === NoteDisplayEnum.LIST ? Style.list : Style.grid)}}
      onContextMenu={handleRightClick}
      onClick={handleOpenModal}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <span css={{...Style.title}}>
        {title}
      </span>
      {
        displayType === NoteDisplayEnum.GRID && (
          <div
            css={{...Style.contentContainer}}
          >
            <CommonEditor value={content} setValue={() => {}} readOnly/>
          </div>
        )
      }
    </div>
  );
};

export default Note;