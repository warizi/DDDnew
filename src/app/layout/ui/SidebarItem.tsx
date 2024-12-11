/** @jsxImportSource @emotion/react */

import { Link, useLocation } from "react-router-dom";
import { SidebarItemProps } from "../model/type";
import { SidebarItemStyle } from "./style";
import { TodoCateSideBar } from "@widgets/todo";

function SidebarItem({
  to,
  name
}: SidebarItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const isTodo = pathname.includes('/todo') && to.includes('/todo');

  return (
    <li>
      <Link to={to} css={SidebarItemStyle.link}>
        <div css={SidebarItemStyle.container(isActive)}>
          {name}
        </div>
      </Link>
      <TodoCateSideBar isActive={isTodo}/>
    </li>
  );
};

export default SidebarItem;