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

  // DnD Event end handler
  // 클라이언트 상태값을 변경하고, 서버에 변경된 값을 반영한다.
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setTodoCates((prev) => {
      const activeIndex = prev.findIndex((cate) => cate.id === activeColumnId);
      const overIndex = prev.findIndex((cate) => cate.id === overColumnId);

      const updatedClientTodoCateList = arrayMove(prev, activeIndex, overIndex);

      const newUpdateTodoCate = calcOrder(updatedClientTodoCateList, activeColumnId);

      mutate(newUpdateTodoCate, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TodoQueryKey.todoCategories]
          });
        }
      });

      return updatedClientTodoCateList;
    })

    setActiveTodoCate(null);
  }
  
  // DnD Sensor
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