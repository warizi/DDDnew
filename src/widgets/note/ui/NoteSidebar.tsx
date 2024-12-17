/** @jsxImportSource @emotion/react */

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { NoteFolder, NoteStore } from "@entities/note";
import { CreateNoteFolderBtn, ListNoteFolder } from "@features/note";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import useNoteFolderDnd from "../model/useNoteFolderDnd";
import { NoteFolderType } from "@shared/db";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '250px',
    height: "100vh",
    backgroundColor: '#21242A',
  } as const,
  subTitle: {
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    color: '#B4B4B4',
    padding: '0 20px',
    fontSize: '20px',
  }
}

function NoteSidebar() {
  const { activeNoteCategory } = useRecoilValue(NoteStore);
  const { 
    noteFolderData,
    handleDragEnd,
    handleDragStart,
    sensors,
    activeNoteFolder
  } = useNoteFolderDnd(activeNoteCategory);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div css={{...Style.container}}>
        <div>
          <h3 css={{...Style.subTitle}}>{activeNoteCategory} FOLDER</h3>
          <ListNoteFolder data={noteFolderData}/>
        </div>
        <CreateNoteFolderBtn />
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeNoteFolder && 
              <NoteFolder data={noteFolderData.find((folder) => folder.id === activeNoteFolder.id) as NoteFolderType} />
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default NoteSidebar;