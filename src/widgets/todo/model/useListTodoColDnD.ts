import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateTodoCol } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import useGetTodoColsByCateId from "@features/todo/model/useGetTodoColsByCateId"
import { Id, TodoColumnType } from "@shared/db/model/types"
import { calcOrder } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const useListTodoColDnD = (todoCateId: Id) => {
  const data = useGetTodoColsByCateId(todoCateId);
  const [ todoCols, setTodoCols ] = useState<TodoColumnType[]>([]);
  const todoColIds = useMemo(() => todoCols.map((col) => col.id), [todoCols]);
  const [ activeTodoCol, setActiveTodoCol ] = useState<TodoColumnType | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateTodoCol();

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "todoCol") {
      setActiveTodoCol(event.active.data.current?.todoCol);
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setTodoCols((prev) => {
      const activeIndex = prev.findIndex((col) => col.id === activeColumnId);
      const overIndex = prev.findIndex((col) => col.id === overColumnId);

      const updatedClientTodoColList = arrayMove(prev, activeIndex, overIndex);

      const newUpdateTodoCol = calcOrder(updatedClientTodoColList, activeColumnId);

      mutate(newUpdateTodoCol, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TodoQueryKey.todoColumns, todoCateId]
          });
        }
      });

      return updatedClientTodoColList;
    })
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );

  useEffect(() => {
    if (data) {
      setTodoCols(data);
    }
  }, [data])

  return {
    todoCols,
    todoColIds,
    handleDragStart,
    sensors,
    handleDragEnd,
    activeTodoCol
  }
}

export default useListTodoColDnD;