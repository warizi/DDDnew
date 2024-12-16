/** @jsxImportSource @emotion/react */

import { ContextMenuItem, useContextMenu } from "@shared/components/contextMenu";
import { MODAL_KEY, MODAL_TYPE, useModal } from "@shared/components/modal";
import { TodoType } from "@shared/db";
import { TrashIcon } from "@shared/icon";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteTodo from "../model/useDeleteTodo";
import { TodoQueryKey } from "../api/todoQueryKey";
import { useRecoilValue } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { Textarea } from "@shared/components/form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatSortableId } from "@features/todo/model/formatSortableId";

const Style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    zIndex: 1,
    height: "fit-content",
  } as const,
  title: {
    fontWeight: "bold",
    zIndex: 1,
  } as const,
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  } as const,
  date: {
    fontSize: "12px",
    color: "#999",
    zIndex: 1,
  },
  hidden: {
    opacity: 0,
    zIndex: 1,
  },
  discription: {
    display: "block",
    overflow: "hidden",
    width: "100%",
    maxHeight: "5em",
    fontSize: "12px",
    backgroundColor: "#f9f9f9",
    color: "#999",
    resize: "none",
    border: "none",
    outline: "none",
    padding: "5px",
    cursor: "pointer",
    zIndex: 1,
  } as const,
  isDraggin: {
    backgroundColor: "#f9f9f9",
    border: "1px dashed #d9d9d9",
    opacity: 0.5,
  }
}

function Todo({
  data
}: {
  data: TodoType
}) {
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);
  const { title, startDate, endDate, priority, description } = data;
  const { handleContextMenu } = useContextMenu();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { mutate } = useDeleteTodo();

  const handleDelete = () => {
    mutate(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todos, selectedTodoCate.id]
        });
      }
    })
  }

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: formatSortableId(data.id, "todo"),
    data: {
      type: "todo",
      todo: data
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: isDragging ? 1000 : 10
  }

  const contextItem = [
    <ContextMenuItem 
      key={"todo-" + 1}
      icon={<TrashIcon size={18}/>}
      text={"Delete"}
      onClick={() => handleDelete()}
    />
  ]
  const handleOpenModal = () => {
    console.log("open modal");
    openModal(
      MODAL_TYPE.SLIDE_RIGHT,
      MODAL_KEY.EDIT_TODO,
      data
    )
  }
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleContextMenu(e, contextItem);
  }
  if (isDragging) {
    return (
      <div css={{...Style.container, ...Style.isDraggin}}
        onContextMenu={handleRightClick}
        onClick={handleOpenModal}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <span css={{...Style.title, ...Style.hidden}}>
          {title}
        </span>
        <div>
          {
            description && (
              <Textarea css={{...Style.discription, ...Style.hidden}}
                value={
                  description
                }
                readOnly
              />
            )
          }
        </div>
        <div css={{...Style.footer, ...Style.hidden}}>
          <span>
            {priority}
          </span>
          <span css={Style.date}>
            {
              !(startDate && endDate) ? "No due date" : ""
            }
            {startDate} {endDate ? ` ~ ${endDate}` : ""}
          </span>
        </div>
      </div>
    )
  }
  return (
    <div css={Style.container}
      onContextMenu={handleRightClick}
      onClick={handleOpenModal}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <span css={Style.title}>
        {title}
      </span>
      <div>
        {
          description && (
            <Textarea css={Style.discription}
              value={
                description
              }
              readOnly
            />
          )
        }
      </div>
      <div css={Style.footer}>
        <span>
          {priority}
        </span>
        <span css={Style.date}>
          {
            !(startDate && endDate) ? "No due date" : ""
          }
          {startDate} {endDate ? ` ~ ${endDate}` : ""}
        </span>
      </div>
    </div>
  );
};

export default Todo;