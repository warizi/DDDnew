
/** @jsxImportSource @emotion/react */

import { useRecoilState } from "recoil";
import ContextMenuContainer from "../ui/ContextMenuContainer";
import ContextMenuStore from "./ContextMenu";
import { useEffect } from "react";

function ContextMenuProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [ contextMenu, setContextMenu ] = useRecoilState(ContextMenuStore);

  const { isOpen, x, y, items } = contextMenu;

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenu({
        isOpen: false,
        x: 0,
        y: 0,
        items: []
      });
    }
    window.addEventListener('click', closeContextMenu);
  }, [])
  return (
    <>
      {children}
      {
        isOpen && (
          <ContextMenuContainer x={x} y={y}>
            {items}
          </ContextMenuContainer>
        )
      }
    </>
  );
};

export default ContextMenuProvider;