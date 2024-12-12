import { useRecoilState } from "recoil";
import ModalStore from "./ModalStore";
import { MODAL_KEY, MODAL_TYPE } from "./MODAL_ENUM";
import { useState } from "react";

const useModal = () => {
  const [ modal, setModal ] = useRecoilState(ModalStore);
  const [ isClosing, setIsClosing ] = useState(false);

  const openModal = (modalType: MODAL_TYPE, modalKey: MODAL_KEY, modalData: any) => {
    setModal({
      isOpen: true,
      isCloseStart: false,
      modalType,
      modalKey,
      modalData,
    });
  }

  const closeModal = () => {
    setIsClosing(true);
    setModal({
      ...modal,
      isCloseStart: true,
    });

    setTimeout(() => {
      setModal({
        ...modal,
        modalData: null,
        modalKey: null,
        isOpen: false,
        isCloseStart: false,
      });
      setIsClosing(false);
    }, 290);
  }

  return {
    openModal,
    closeModal,
    isClosing,
  }
}

export default useModal;