/** @jsxImportSource @emotion/react */

import { HeaderStyle } from "./style";

function Header() {
  return (
    <div css={HeaderStyle.container}>
      <header css={HeaderStyle.header}>
        <h1 css={HeaderStyle.title}>DDD</h1>
        <div>username</div>
      </header>
    </div>
  );
};

export default Header;