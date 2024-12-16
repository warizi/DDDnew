/** @jsxImportSource @emotion/react */

import { keyframes } from "@emotion/react";
import { useRecoilValue } from "recoil";
import ModalStore from "../model/ModalStore";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Style = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 9000,
} as const;

function Backdrop({
  onClick
}: {
  onClick: () => void;
}) {
  const modalState = useRecoilValue(ModalStore);

  const aniStyle = {
    animation: `${modalState.isCloseStart ? fadeOut : fadeIn} 0.3s forwards`,
  }
  return (
    <div css={{...Style, ...aniStyle}} onClick={onClick}>
    </div>
  );
};

export default Backdrop;