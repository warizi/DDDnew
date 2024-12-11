/** @jsxImportSource @emotion/react */

import { TodoCategoryType } from "@shared/db";
import { ListBullet, TrashIcon } from "@shared/icon";
import { useState } from "react";
import useUpdateTodoCate from "../model/useUpdateTodoCate";
import { useQueryClient } from "@tanstack/react-query";
import { TodoQueryKey } from "../api/todoQueryKey";
import useDeleteTodoCate from "../model/useDeleteTodoCate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRecoilState } from "recoil";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { TodoCateStyle } from "./TodoCate.style";

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
  }

  const onEditModeEnd = () => {
    handleUpdateTodoCate();
    setIsEditMode(false);
  }

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
      {...listeners}
      style={style}
    >
      <div
        onClick={onEditModeStart}
      >
        <ListBullet />
      </div>
      {
        isEditMode ? (
          <input 
            css={TodoCateStyle.input}
            type="text" 
            value={name} 
            onChange={handleChange}
            onBlur={onEditModeEnd}  
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
      <div 
        css={TodoCateStyle.deleteBtn}
        onClick={handleDeleteTodoCate}  
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default TodoCate;
