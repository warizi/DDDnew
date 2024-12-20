/** @jsxImportSource @emotion/react */

import { Note, NoteStore } from "@entities/note";
import { ListNote, NoteControlBar } from "@features/note";
import { useRecoilValue } from "recoil";
import useNoteDnd from "../model/useNoteDnd";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";

const Style = {
  container: {
    width: "100%",
    height: "100vh",
    padding: '20px',
  }
}

function NoteContents() {
  const { activeNoteFolderId, displayType } = useRecoilValue(NoteStore);
  const {
    noteList,
    activeNote,
    sensors,
    handleDragStart,
    handleDragEnd
  } = useNoteDnd(activeNoteFolderId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div css={{...Style.container}}>
        <NoteControlBar />
        <ListNote data={noteList} />
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeNote && (
                <Note data={activeNote} displayType={displayType} />
              )
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default NoteContents;