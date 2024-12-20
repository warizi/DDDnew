/** @jsxImportSource @emotion/react */

import { NoteForm } from "@features/note";
import { MODAL_KEY, ModalStore, SideModal } from "@shared/components/modal";
import { useRecoilValue } from "recoil";

const Style = {
}

function EditNoteModal() {
  const modalState = useRecoilValue(ModalStore);
  return (
    <>
      <SideModal modalKey={MODAL_KEY.EDIT_NOTE}>
        <NoteForm 
          data={modalState.modalData}
        />
      </SideModal>
    </>
  );
};

export default EditNoteModal;