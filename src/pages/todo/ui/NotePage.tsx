/** @jsxImportSource @emotion/react */

import { NoteSidebar } from "@widgets/note";

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
    <div css={{...Style.container}}>
      <NoteSidebar />
    </div>
  );
};

export default NotePage;