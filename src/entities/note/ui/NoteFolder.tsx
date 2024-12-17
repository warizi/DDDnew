/** @jsxImportSource @emotion/react */

import { NoteFolderType } from "@shared/db";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { NoteStore } from "../model/NoteStore";
import { ContextMenuItem, useContextMenu } from "@shared/components/contextMenu";
import useUpdateNoteFolder from "../model/useUpdateNoteFolder";
import useDeleteNotefolder from "../model/useDeleteNotefolder";
import { NoteQueryKey } from "../model/NoteQueryKey";
import { EditIcon, TrashIcon } from "@shared/icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Style = {
  constainer: {
    width: "100%",
    height: "35px",
    lineHeight: "35px",
    padding: "0 20px",
    backgroundColor: "#2F3645",
    color: "#B4B4B4",
    fontSize: "14px",
    cursor: "pointer",
    ":hover": {
      color: "#fff",
    }
  } as const,
  isActive: {
    color: "#fff",
  },
  input: {
    fontSize: '14px',
    height: '30px',
    lineHeight: '30px',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #d9d9d9',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'white',
  } as const,
  isDragging: {
    border: '1px dashed #fff',
    borderRadius: '5px',
    opacity: 0.5,
    backgroundColor: "#384151",
  }
}

function NoteFolder({
  data
}: {
  data: NoteFolderType
}) {
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ name, setName ] = useState(data.name);
  const queryClient = useQueryClient();
  const [ noteStore, setNoteStore ] = useRecoilState(NoteStore);
  const { handleContextMenu } = useContextMenu();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateNoteFolder } = useUpdateNoteFolder();
  const { mutate: deleteNoteFolder } = useDeleteNotefolder();

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: "noteFolder",
      noteFolder: data
    }
  });

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: isDragging ? 1000 : 10
  }

  const handleUpdateNoteFolder = () => {
    const updatedData = {
      ...data,
      name: name
    }
    updateNoteFolder(updatedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.NoteFolder, noteStore.activeNoteCategory]
        })
      }
    });
  }

  const handleDeleteNoteFolder = () => {
    deleteNoteFolder(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.NoteFolder, noteStore.activeNoteCategory]
        })
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const onEditModeStart = () => {
    setIsEditMode(true);
    setTimeout(() => {
      if(inputRef.current){
        inputRef?.current?.focus();
      }
    }, 200)
  }
  const onEditModeEnd = () => {
    handleUpdateNoteFolder();
    setIsEditMode(false);
  }

  const handleSelectFolder = () => {
    setNoteStore({
      ...noteStore,
      activeNoteFolderId: data.id
    });
  }

  const constextMenuItems = [
    <ContextMenuItem 
      key={"noteFolder-" + 0}
      text={data.name}
    />,
    <ContextMenuItem 
      key={"noteFolder-" + 1}
      icon={<EditIcon size={18}/>}
      text="Edit"
      onClick={onEditModeStart}
    />,
    <ContextMenuItem
      key={"noteFolder-" + 2}
      icon={<TrashIcon size={18}/>}
      text="Delete"
      onClick={handleDeleteNoteFolder}
    />
  ];

  if (isDragging) {
    return (
      <div css={{...Style.constainer, ...Style.isDragging}}
        ref={setNodeRef}
        style={dndStyle}
      >
      </div>
    )
  }
  return (
    <div css={{...Style.constainer, ...(noteStore.activeNoteFolderId === data.id ? Style.isActive : {})}}
      onContextMenu={(e) => handleContextMenu(e, constextMenuItems)}
      onClick={handleSelectFolder}
      ref={setNodeRef}
      {...attributes}
      {...(isEditMode ? {} : listeners)}
      style={dndStyle}
    >
      {
        isEditMode ? (
          <input
            css={Style.input}
            ref={inputRef}
            value={name}
            onChange={handleChange}
            onBlur={onEditModeEnd}
          />
        ) : (
          <div>
            {data.name}
          </div>
        )
      }
    </div>
  );
};

export default NoteFolder;