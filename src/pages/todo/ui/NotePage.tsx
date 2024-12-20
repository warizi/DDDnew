/** @jsxImportSource @emotion/react */

import { EditNoteModal, NoteContents, NoteSidebar } from "@widgets/note";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
    width: '100%',
    height: '100vh',
  } as const
}

function NotePage() {
  return (
    <>
      <div css={{...Style.container}}>
        <NoteSidebar />
        <NoteContents />
      </div>
      <EditNoteModal />
    </>
  );
};

export default NotePage;