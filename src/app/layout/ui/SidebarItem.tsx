/** @jsxImportSource @emotion/react */

import { Link, useLocation } from "react-router-dom";
import { SidebarItemProps } from "../model/type";
import { SidebarItemStyle } from "./style";
import { TodoCateSideBar } from "@widgets/todo";
import { NoteCategory } from "@widgets/note";

function SidebarItem({
  to,
  name
}: SidebarItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const isTodo = pathname.includes('/todo') && to.includes('/todo');
  const isNote = pathname.includes('/note') && to.includes('/note');

  return (
    <li>
      <Link to={to} css={SidebarItemStyle.link}>
        <div css={SidebarItemStyle.container(isActive)}>
          {name}
        </div>
      </Link>
      <TodoCateSideBar isActive={isTodo}/>
      <NoteCategory isActive={isNote}/>
    </li>
  );
};

export default SidebarItem;