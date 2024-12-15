import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateTodo, useUpdateTodoCol } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { useGetTodoByCateId } from "@features/todo";
import { formatSortableId } from "@features/todo/model/formatSortableId";
import useGetTodoColsByCateId from "@features/todo/model/useGetTodoColsByCateId"
import { Id, TodoColumnType, TodoType } from "@shared/db/model/types"
import { calcOrder } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


const useListTodoColDnD = (todoCateId: Id) => {
  const data = useGetTodoColsByCateId(todoCateId);
  const todoList = useGetTodoByCateId(todoCateId);
  const [ todoCols, setTodoCols ] = useState<TodoColumnType[]>([]);
  const [ todos, setTodoListData ] = useState<TodoType[]>([]);
  const [ activeTodoCol, setActiveTodoCol ] = useState<TodoColumnType | null>(null);
  const [ activeTodo, setActiveTodo ] = useState<TodoType | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateTodoCol();
  const { mutate: mutateTodo } = useUpdateTodo();

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "todoCol") {
      setActiveTodo(null);
      setActiveTodoCol(event.active.data.current?.todoCol);
      return;
    }

    if (event.active.data.current?.type === "todo") {
      setActiveTodoCol(null);
      setActiveTodo(event.active.data.current?.todo);
      return;
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    

    const isActiveTodo = active.data.current?.type === "todo";
    const isOverTodo = over.data.current?.type === "todo";

    if (!isActiveTodo) return;
    // 다른 todo 오버
    if (isActiveTodo && isOverTodo) {
      setTodoListData((prev) => {
        const activeIndex = prev.findIndex((todo) => formatSortableId(todo.id, "todo") === active.id);
        const overIndex = prev.findIndex((todo) => formatSortableId(todo.id, "todo") === over.id);

        todos[activeIndex].todoColumnId = todos[overIndex].todoColumnId;
        const newArray = arrayMove(prev, activeIndex, overIndex);
        const columnTodos = newArray.filter((todo) => todo.todoColumnId === todos[overIndex].todoColumnId);
        const newUpdateTodo = calcOrder(columnTodos, active.id, "todo");

        mutateTodo(newUpdateTodo, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [TodoQueryKey.todos, todoCateId]
            });
          }
        });

        return newArray;
      })
    }

    const isOverATodoCol = over.data.current?.type === "todoCol";

    // 같은 컬럼 오버 
    if (isActiveTodo && isOverATodoCol) {
      setTodoListData((prev) => {
        const activeIndex = prev.findIndex((todo) => formatSortableId(todo.id, "todo") === active.id);
        const overId = String(over.id).slice(0, -2);
        todos[activeIndex].todoColumnId = Number(overId);
        const newArray = arrayMove(prev, activeIndex, activeIndex);
        const columnTodos = newArray.filter((todo) => todo.todoColumnId === Number(overId));
        const newUpdateTodo = calcOrder(columnTodos, active.id, "todo");

        mutateTodo(newUpdateTodo, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [TodoQueryKey.todos, todoCateId]
            });
          }
        });
        return newArray;
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    if (activeTodoCol) {
      setTodoCols((prev) => {
        const activeIndex = prev.findIndex((col) => formatSortableId(col.id, "todoCol") === activeColumnId);
        const overIndex = prev.findIndex((col) => formatSortableId(col.id, "todoCol") === overColumnId);
  
        const updatedClientTodoColList = arrayMove(prev, activeIndex, overIndex);
  
        const newUpdateTodoCol = calcOrder(updatedClientTodoColList, activeColumnId, "todoCol");
  
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

    setActiveTodoCol(null);
    setActiveTodo(null);
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
    if (todoList) {
      setTodoListData(todoList);
    }
  }, [data, todoList])

  return {
    todoCols,
    todos,
    handleDragStart,
    sensors,
    handleDragEnd,
    handleDragOver,
    activeTodoCol,
    activeTodo
  }
}

export default useListTodoColDnD;