/** @jsxImportSource @emotion/react */

import { TodoColumnType } from "@shared/db";
import { TrashIcon } from "@shared/icon";
import useDeleteTodoCol from "../model/useDeleteTodoCol";
import useUpdateTodoCol from "../model/useUpdateTodoCol";
import { useQueryClient } from "@tanstack/react-query";
import { TodoQueryKey } from "../api/todoQueryKey";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '350px',
    minHeight: '100px',
    backgroundColor: '#545E6F',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '2px',
  } as const,
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    height: "35px",
    lineHeight: "35px",
    padding: "0 5px 0 16px",
    backgroundColor: "#252C38",
    color: "white",
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
  },
  deleteBtn: {
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 2px',
    borderRadius: '5px',
    backgroundColor: '#252C38',
    stroke: '#DE4747',
    border: 'none',
    width: "30px",
    opacity: 0,
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#475671',
      opacity: 1,
    },
  },
  isDragging: {
    border: "1px dashed #d9d9d9",
    borderRadius: "10px",
    opacity: 0.5,
  },
  contents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  } as const
}

function TodoCol({
  data,
  children
}: {
  data: TodoColumnType
  children?: React.ReactNode
}) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoCol } = useUpdateTodoCol();
  const { mutate: deleteTodoCol } = useDeleteTodoCol();

  const [ name, setName ] = useState(data.name);
  const [ isEditMode, setIsEditMode ] = useState(false);

  const handleDeleteTodoCol = () => {
    deleteTodoCol(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todoColumns, data.todoCategoryId]
        });
      }
    });
  }
  const handleUpdateTodoCol = () => {
    const updateData: TodoColumnType = {
      id: data.id,
      name: name,
      todoCategoryId: data.todoCategoryId,
      order: data.order
    }
    updateTodoCol(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todoColumns, data.todoCategoryId]
        });
        setIsEditMode(false);
      }
    });
  }

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: "todoCol",
      todoCol: data
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    // zIndex: isDragging ? 1000 : 10
  }

  if (isDragging) {

    return (
      <div css={{...Style.container, ...Style.isDragging}}
        ref={setNodeRef}
        style={style}
      >
      </div>
    )
  }
  return (
    <div css={Style.container}
      ref={setNodeRef}
      style={style}
    >
      <div css={Style.title}
        onClick={() => setIsEditMode(true)}
        {...attributes}
        {...listeners}
      >
        {
          isEditMode ? (
            <input 
              css={{fontSize: '16px', width: '100%', outline: 'none'}}
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleUpdateTodoCol}
            />
          ) : (
            <span>
              {name} 
            </span>
          )
        }
        <button css={Style.deleteBtn}
          onClick={handleDeleteTodoCol}
        >
          <TrashIcon />
        </button>
      </div>
      <div css={Style.contents}>
        {children}
      </div>
    </div>
  );
};

export default TodoCol;