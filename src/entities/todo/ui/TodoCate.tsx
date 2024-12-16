/** @jsxImportSource @emotion/react */

import { TodoCategoryType } from "@shared/db";
import { EditIcon, TrashIcon } from "@shared/icon";
import { useRef, useState } from "react";
import useUpdateTodoCate from "../model/useUpdateTodoCate";
import { useQueryClient } from "@tanstack/react-query";
import { TodoQueryKey } from "../api/todoQueryKey";
import useDeleteTodoCate from "../model/useDeleteTodoCate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRecoilState } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { TodoCateStyle } from "./TodoCate.style";
import { ContextMenuItem, useContextMenu } from "@shared/components/contextMenu";

function TodoCate({
  data
}: {
  data: TodoCategoryType
}) {
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ name, setName ] = useState(data.name);
  const queryClient = useQueryClient();
  const { mutate: updateTodoCate } = useUpdateTodoCate();
  const { mutate: deleteTodoCate } = useDeleteTodoCate();
  const [ selectedTodoCate, setSelectedTodoCate ] = useRecoilState(SelectedTodoCateStore);
  const { handleContextMenu } = useContextMenu();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: "todoCate",
      todoCate: data
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: isDragging ? 1000 : 10
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleUpdateTodoCate = () => {
    const updatedData = {
      ...data,
      name: name
    }
    updateTodoCate(updatedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todoCategories]
        });
      }
    });
  }

  const handleDeleteTodoCate = () => {
    deleteTodoCate(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todoCategories]
        });
      }
    });
  }

  const onEditModeStart = () => {
    setIsEditMode(true);
    setTimeout(() => {
      if(inputRef.current){
        inputRef?.current?.focus();
      }
    }, 200)
  }

  const onEditModeEnd = () => {
    handleUpdateTodoCate();
    setIsEditMode(false);
  }

  const contextMenuItems = [
    <ContextMenuItem
      key={"todocate-" + 1}
      icon={<EditIcon size={18}/>}
      text="Edit"
      onClick={onEditModeStart}
    />,
    <ContextMenuItem
    key={"todocate-" + 2}
      icon={<TrashIcon size={18}/>}
      text="Delete"
      onClick={handleDeleteTodoCate}
    />,
  ]

  if (isDragging) {

    return (
      <div
        css={{...TodoCateStyle.container, ...TodoCateStyle.dragging}}
        ref={setNodeRef}
        style={style}
      >

      </div>
    )
  }

  return (
    <div 
      css={{
        ...TodoCateStyle.container,
        ...(selectedTodoCate.id === data.id ? {backgroundColor: "#5C6B8A"} : {})
      }}
      ref={setNodeRef}
      {...attributes}
      {...(isEditMode ? {} : listeners)}
      style={style}
      onContextMenu={(e) => handleContextMenu(e, contextMenuItems)}
    >
      {
        isEditMode ? (
          <input 
            ref={inputRef}
            css={TodoCateStyle.input}
            type="text" 
            value={name} 
            onChange={handleChange}
            onBlur={onEditModeEnd}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                onEditModeEnd();
              }}
            }
          />
        ) : (
          <span 
            css={TodoCateStyle.span}
            onClick={() => setSelectedTodoCate(data)}
          >
            {name}
          </span>
        )
      }
    </div>
  );
};

export default TodoCate;
