import { atom } from "recoil";
import { MODAL_KEY, MODAL_TYPE } from "./MODAL_ENUM";

const ModalStore = atom({
  key: "ModalStore",
  default: {
    isOpen: false,
    isCloseStart: false,
    modalType: null as MODAL_TYPE | null,
    modalKey: null as MODAL_KEY | null,
    modalData: null as any,
  }
})

export default ModalStore;