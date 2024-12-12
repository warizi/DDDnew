import { useRecoilState } from "recoil";
import ContextMenuStore from "./ContextMenu";


const useContextMenu = () => {
  const [ _, setContextMenu ] = useRecoilState(ContextMenuStore);

  const openContextMenu = (x: number, y: number, items: React.ReactNode[]) => {
    setContextMenu({
      isOpen: true,
      x,
      y,
      items
    });
  }

  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      x: 0,
      y: 0,
      items: []
    });
  }

  const handleContextMenu = (e: React.MouseEvent, items: React.ReactNode[]) => {
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY, items);
  }

  return {
    handleContextMenu,
    closeContextMenu
  }
}

export default useContextMenu;