/** @jsxImportSource @emotion/react */

import { CreateTodoForm } from "@features/todo";
import { MODAL_KEY, ModalStore, SideModal } from "@shared/modal";
import { useRecoilValue } from "recoil";

function CreateTodoModal() {
  const modalState = useRecoilValue(ModalStore);

  return (
    <SideModal modalKey={MODAL_KEY.CREATE_TODO}>
      <CreateTodoForm todoColumnId={modalState?.modalData}/>
    </SideModal>
  );
};

export default CreateTodoModal;