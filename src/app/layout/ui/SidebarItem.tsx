/** @jsxImportSource @emotion/react */

import { Link, useLocation } from "react-router-dom";
import { SidebarItemProps } from "../model/type";
import { SidebarItemStyle } from "./style";

function SidebarItem({
  to,
  name
}: SidebarItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <li>
      <Link to={to} css={SidebarItemStyle.link}>
        <div css={SidebarItemStyle.container(isActive)}>
          {name}
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;