/** @jsxImportSource @emotion/react */

import { createPortal } from "react-dom"

const Style = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "fit-content",
  minWidth: '100px',
  minHeight: '25px',
  backgroundColor: '#21242A',
  border: "1px solid #D9D9D9",
  borderRadius: '0 10px 10px 10px',
  color: "white",
  overflow: "hidden",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
} as const;

function ContextMenuContainer({
  x,
  y,
  children
}: {
  x: number,
  y: number,
  children: React.ReactNode
}) {
  const position = {
    top: `${y}px`,
    left: `${x}px`,
  }
  return (
    <>
      {
        createPortal(
          <div css={{...Style, ...position}}>
            {children}
          </div>,
          document.body
        )
      }
    </>
  );
};

export default ContextMenuContainer;