import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateTodoCate } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import useAllTodoCatesSort from "@features/todo/model/useAllTodoCatesSort"
import { TodoCategoryType } from "@shared/db";
import { calcOrder } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const useListTodoDnd = () => {
  const data = useAllTodoCatesSort();
  const [ todoCates, setTodoCates ] = useState<TodoCategoryType[]>([]);
  const todoCateIds = useMemo(() => todoCates.map((cate) => cate.id), [todoCates]);
  const [ activeTodoCate, setActiveTodoCate ] = useState<TodoCategoryType | null>(null);

  const queryClient = useQueryClient();
  const { mutate } =useUpdateTodoCate();

  const handleDragStart = (event: DragStartEvent) => {
    
    if (event.active.data.current?.type === "todoCate") {
      setActiveTodoCate(event.active.data.current?.todoCate);
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setTodoCates((prev) => {
      const activeIndex = prev.findIndex((cate) => cate.id === activeColumnId);
      const overIndex = prev.findIndex((cate) => cate.id === overColumnId);

      const newArray = arrayMove(prev, activeIndex, overIndex);

      const newUpdateTodoCate = calcOrder(newArray, activeColumnId);

      mutate(newUpdateTodoCate, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TodoQueryKey.todoCategories]
          });
        }
      });

      return newArray;
    })

    setActiveTodoCate(null);
  }
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  )
  useEffect(() => {
    if (data) {
      setTodoCates(data);
    }
  }, [data]);

  return {
    todoCates,
    setTodoCates,
    todoCateIds,
    activeTodoCate,
    handleDragStart,
    handleDragEnd,
    sensors
  }
}

export default useListTodoDnd;