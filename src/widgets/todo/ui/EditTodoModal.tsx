/** @jsxImportSource @emotion/react */

import { TodoForm } from "@features/todo";
import { Backdrop, MODAL_KEY, ModalStore, SideModal } from "@shared/components/modal";
import { useRecoilValue } from "recoil";

function EditTodoModal() {
  const modalState = useRecoilValue(ModalStore);

  return (
    <>
      <SideModal modalKey={MODAL_KEY.EDIT_TODO}>
        <TodoForm
          todoColumnId={modalState?.modalData?.todoColumnId}
          data={modalState?.modalData}
        />
      </SideModal>
    </>
  );
};

export default EditTodoModal;