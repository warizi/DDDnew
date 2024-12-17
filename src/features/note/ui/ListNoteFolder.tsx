/** @jsxImportSource @emotion/react */

import { SortableContext } from "@dnd-kit/sortable";
import { NoteFolder } from "@entities/note";
import { NoteFolderType } from "@shared/db";
import { useMemo } from "react";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  } as const 
}

function ListNoteFolder({
  data
}: {
  data: NoteFolderType[]
}) {
  const noteFolderIds = useMemo(() => data.map((folder) => folder.id), [data]);
  
  return (
    <div css={{...Style.container}}>
      <SortableContext items={noteFolderIds}>
        {
          data?.map((item) => (
            <NoteFolder key={item.id} data={item} />
          ))
        }
      </SortableContext>
    </div>
  );
};

export default ListNoteFolder;