/** @jsxImportSource @emotion/react */

import { NoteStore } from "@entities/note";
import { ListNote } from "@features/note";
import { useRecoilValue } from "recoil";
import useNoteDnd from "../model/useNoteDnd";

const Style = {
  container: {
    width: "100%",
    height: "100vh",
    padding: '20px',
  }
}

function NoteContents() {
  const { activeNoteFolderId } = useRecoilValue(NoteStore);
  const {
    noteList,
  } = useNoteDnd(activeNoteFolderId);

  return (
    <div css={{...Style.container}}>
      <ListNote data={noteList} />
    </div>
  );
};

export default NoteContents;