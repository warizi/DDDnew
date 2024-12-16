/** @jsxImportSource @emotion/react */

import { NoteFolderType } from "@shared/db";

const Style = {
  constainer: {
    width: "100%"
  }
}

function NoteFolder({
  data
}: {
  data: NoteFolderType
}) {
  const { name } = data;
  return (
    <div css={{...Style.constainer}}>
      {name}
    </div>
  );
};

export default NoteFolder;