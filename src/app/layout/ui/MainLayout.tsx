/** @jsxImportSource @emotion/react */

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { MainStyle } from "./style";

function MainLayout() {
  return (
    <div>
      <Header />
      <div css={MainStyle.container}>
        <Sidebar />
        <div css={MainStyle.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;