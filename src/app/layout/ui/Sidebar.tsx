/** @jsxImportSource @emotion/react */

import { NAV_PATH } from "@shared/consts";
import { SidebarStyle } from "./style";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div css={SidebarStyle.constainer}>
      <div css={SidebarStyle.logo}>
        <h1>DDD</h1>
      </div>
      <nav css={SidebarStyle.nav}>
        <ul>
          {
            NAV_PATH.map((item, index) => (
              <SidebarItem
                key={index}
                to={item.path}
                name={item.name}
              />
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;