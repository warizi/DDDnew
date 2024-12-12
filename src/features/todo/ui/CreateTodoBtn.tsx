/** @jsxImportSource @emotion/react */

import { Id } from "@shared/db/model/types";
import { PlusIcon } from "@shared/icon";
import { MODAL_KEY, MODAL_TYPE, useModal } from "@shared/modal";

const Style = {
  width: "100%",
  height: "40px",
  backgroundColor: "#424B5B",
  color: "#B4B4B4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  stroke: "#B4B4B4",
  border: "none",
  cursor: "pointer",
  ":hover": {
    color: "#fff",
    stroke: "#fff",
  }
}

function CreateTodoBtn({
  todoColumnId
}: {
  todoColumnId: Id;
}) {
  const { openModal } = useModal();
  return (
    <>
      <div css={Style}
        onClick={() => openModal(MODAL_TYPE.SLIDE_RIGHT, MODAL_KEY.CREATE_TODO, { todoColumnId })}
      >
        <PlusIcon />
        Create Todo
      </div>
    </>
  );
};

export default CreateTodoBtn;