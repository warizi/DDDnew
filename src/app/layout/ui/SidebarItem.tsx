/** @jsxImportSource @emotion/react */

import { Link, useLocation } from "react-router-dom";
import { SidebarItemProps } from "../model/type";

function SidebarItem({
  to,
  name
}: SidebarItemProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <li>
      <Link to={to}>
        <div>
          {name}
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;