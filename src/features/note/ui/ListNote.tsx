/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { Note } from "@entities/note";
import { NoteDisplayEnum, NoteType } from "@shared/db/model/types";
import { useMemo } from "react";
import CreateNoteBtn from "./CreateNoteBtn";

const Style = {
  container: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  } as const,
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  } as const,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  } as const
}

function ListNote({
  data
}: {
  data: NoteType[]
}) {
  const noteIds = useMemo(() => data.map((note) => note.id), [data]);

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
    <div css={{...Style.container, ...returnDisplayStyle(NoteDisplayEnum.GRID)}}>
      <SortableContext items={noteIds}>
        <CreateNoteBtn displayType={NoteDisplayEnum.GRID} />
        {
          data?.map((item) => (
            <Note key={item.id} data={item} displayType={NoteDisplayEnum.GRID} />
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListNote;