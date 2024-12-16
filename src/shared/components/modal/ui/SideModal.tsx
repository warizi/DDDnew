/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import ModalStore from "../model/ModalStore";
import useModal from "../model/useModal";
import { keyframes } from "@emotion/react";
import { MODAL_KEY, MODAL_TYPE } from "../model/MODAL_ENUM";
import { createPortal } from "react-dom";
import { CloseIcon } from "@shared/icon";

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
const Style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 'fit-content',
    minWidth: '300px',
    height: '100vh',
    backgroundColor: '#fff',
    zIndex: 9999,
  } as const,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '35px',
    padding: "5px",
  } as const,
  closeBtn: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    stroke: '#B4B4B4',
    ":hover": {
      stroke: '#000000',
    }
  } as const,
}

function SideModal({
  modalKey,
  children,
}: {
  modalKey: MODAL_KEY;
  children: React.ReactNode;
}) {
  const modalState = useRecoilValue(ModalStore);
  const { closeModal, isClosing } = useModal();

  const returnAnimation = () => {
    if (modalState.modalType === MODAL_TYPE.SLIDE_RIGHT) {
      const aniStyle = {
        animation: `${modalState.isOpen ? slideInRight : slideOutRight} 0.3s ease forwards`,
      }
      if (modalState.isCloseStart) {
        aniStyle.animation = `${slideOutRight} 0.3s ease forwards`;
      }
      return aniStyle;
    }
  }
  const returnLocation = () => {
    if (modalState.modalType === MODAL_TYPE.SLIDE_RIGHT) {
      return { right: 0, left: 'auto' };
    }
  }
  return createPortal(
      (modalState.isOpen && modalState.modalKey === modalKey) &&
      <div css={{...Style.container, ...returnAnimation(), ...returnLocation()}}>
        <div css={Style.header}>
          <button css={Style.closeBtn}
            onClick={closeModal}
            disabled={isClosing}
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      ,
      document.body
    );
};

export default SideModal;