/** @jsxImportSource @emotion/react */

import { MODAL_KEY, ModalStore, SideModal } from "@shared/components/modal";
import { useRecoilValue } from "recoil";

const Style = {
}

function EditNoteModal() {
  const modalState = useRecoilValue(ModalStore);
  return (
    <>
      <SideModal modalKey={MODAL_KEY.EDIT_NOTE}>
        <div></div>
      </SideModal>
    </>
  );
};

export default EditNoteModal;