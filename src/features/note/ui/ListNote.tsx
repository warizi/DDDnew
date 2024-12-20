/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { Note, NoteStore } from "@entities/note";
import { NoteDisplayEnum, NoteType } from "@shared/db/model/types";
import { useMemo } from "react";
import CreateNoteBtn from "./CreateNoteBtn";
import { useRecoilValue } from "recoil";

const Style = {
  container: {
    width: "100%",
    maxHeight: "100%",
    overflowY: "auto",
  } as const,
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as const,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    justifyContent: "space-between",
  } as const
}

function ListNote({
  data
}: {
  data: NoteType[]
}) {
  const noteIds = useMemo(() => data.map((note) => note.id), [data]);
  const noteStore = useRecoilValue(NoteStore);

  const returnDisplayStyle = (displayType: NoteDisplayEnum) => {
    switch (displayType) {
      case NoteDisplayEnum.LIST:
        return Style.list;
      case NoteDisplayEnum.GRID:
        return Style.grid;
      default:
        return Style.list;
    }
  }
  return (
    <div css={{...Style.container, ...returnDisplayStyle(noteStore.displayType)}}>
      <SortableContext items={noteIds}>
        <CreateNoteBtn displayType={noteStore.displayType} />
        {
          data?.map((item) => (
            <Note key={`${item.id}-${noteStore.activeNoteFolderId}`} data={item} displayType={noteStore.displayType} />
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListNote;