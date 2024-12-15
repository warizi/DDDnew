/** @jsxImportSource @emotion/react */

import { TodoColumnType } from "@shared/db";
import { EditIcon, TrashIcon } from "@shared/icon";
import useDeleteTodoCol from "../model/useDeleteTodoCol";
import useUpdateTodoCol from "../model/useUpdateTodoCol";
import { useQueryClient } from "@tanstack/react-query";
import { TodoQueryKey } from "../api/todoQueryKey";
import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ContextMenuItem, useContextMenu } from "@shared/components/contextMenu";
import { formatSortableId } from "@features/todo/model/formatSortableId";

const Style = {
  outerContainer: {
    width: 'fit-content',
    height: 'calc(90vh - 60px)',
  },
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    // flexDirection: 'column',
    // justifyContent: 'start',
    // alignItems: 'center',
    overflow: 'hidden',
    width: '350px',
    minHeight: '300px',
    backgroundColor: '#545E6F',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  } as const,
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    height: "35px",
    lineHeight: "35px",
    padding: "0 16px 0 16px",
    backgroundColor: "#252C38",
    color: "white",
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
  },
  isDragging: {
    border: "1px dashed #d9d9d9",
    borderRadius: "10px",
    opacity: 0.5,
  },
  hidden: {
    opacity: 0,
  },
  contents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '5px',
    overflowY: 'auto',
  } as const,
  input: {
    fontSize: '16px',
    height: '30px',
    lineHeight: '30px',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #d9d9d9',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'white',
  }
}

function TodoCol({
  data,
  addTodoBtn,
  children
}: {
  data: TodoColumnType
  addTodoBtn?: React.ReactNode
  children?: React.ReactNode
}) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoCol } = useUpdateTodoCol();
  const { mutate: deleteTodoCol } = useDeleteTodoCol();

  const [ name, setName ] = useState(data.name);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const { handleContextMenu } = useContextMenu();
  const inputRef = useRef<HTMLInputElement>(null);

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
    id: formatSortableId(data.id, "todoCol"),
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

  const contextMenuItems = [
    <ContextMenuItem
      key={'todocol-' + 1}
      icon={<EditIcon />}
      text="Edit"
      onClick={() => {
        setIsEditMode(true)
        setTimeout(() => {
          inputRef.current?.focus();
        }, 200);
      }}
    />,
    <ContextMenuItem
      key={'todocol-' + 2}
      icon={<TrashIcon />}
      text="Delete"
      onClick={handleDeleteTodoCol}
    />
  ]

  if (isDragging) {

    return (
      <div css={Style.outerContainer}
      ref={setNodeRef}
      style={style}
    >
      <div css={{...Style.container, ...Style.isDragging}}
      >
        <div css={{...Style.title, ...Style.hidden}}
          {...attributes}
          {...(isEditMode ? {} : listeners)}
          onContextMenu={(e) => handleContextMenu(e, contextMenuItems)}
        >
          {
            isEditMode ? (
              <input 
                ref={inputRef}
                css={Style.input}
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleUpdateTodoCol}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTodoCol();
                    setIsEditMode(false);
                  }
                }}
              />
            ) : (
              <span>
                {name} 
              </span>
            )
          }
        </div>
        <div css={{...Style.contents, ...Style.hidden}}>
          {children}
        </div>
        {addTodoBtn}
      </div>
    </div>
    )
  }
  return (
    <div css={Style.outerContainer}
      ref={setNodeRef}
      style={style}
    >
      <div css={Style.container}
      >
        <div css={Style.title}
          {...attributes}
          {...(isEditMode ? {} : listeners)}
          onContextMenu={(e) => handleContextMenu(e, contextMenuItems)}
        >
          {
            isEditMode ? (
              <input 
                ref={inputRef}
                css={Style.input}
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleUpdateTodoCol}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateTodoCol();
                    setIsEditMode(false);
                  }
                }}
              />
            ) : (
              <span>
                {name} 
              </span>
            )
          }
        </div>
        <div css={Style.contents}>
          {children}
        </div>
        {addTodoBtn}
      </div>
    </div>
  );
};

export default TodoCol;