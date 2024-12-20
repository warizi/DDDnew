/** @jsxImportSource @emotion/react */

import { NoteStore } from "@entities/note";
import { Select } from "@shared/components/form";
import { NoteDisplayEnum } from "@shared/db/model/types";
import { useRecoilState } from "recoil";

const Style = {
  container: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
}

function NoteControlBar() {
  const [ noteStore, setNoteStore ] = useRecoilState(NoteStore);

  const handleDisplayType = (type: NoteDisplayEnum) => {
    setNoteStore({
      ...noteStore,
      displayType: type
    })
  }
  return (
    <div css={{...Style.container}}>
      <Select 
        data={[
          { value: NoteDisplayEnum.GRID, label: "GRID" },
          { value: NoteDisplayEnum.LIST, label: "LIST" }
        ]}
        value={noteStore.displayType}
        onChange={(e) => handleDisplayType(e.target.value as NoteDisplayEnum)}
      />
    </div>
  );
};

export default NoteControlBar;