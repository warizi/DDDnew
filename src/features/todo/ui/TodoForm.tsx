/** @jsxImportSource @emotion/react */

import { useUpdateTodo } from "@entities/todo";
import { TodoQueryKey } from "@entities/todo/api/todoQueryKey";
import { CalendarPickerType } from "@shared/components/calendar/model/useCalendarDate";
import { InputWithPriority, Textarea } from "@shared/components/form";
import InputWithCalendar from "@shared/components/form/ui/InputWithCalendar";
import { Id, TodoType } from "@shared/db/model/types";
import SelectedTodoCateStore from "@shared/store/todo/model/SelectedTodoCateStore";
import { debounce, FormatDate } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    width: '700px',
    gap: '10px',
  } as const,
  titleInput: {
    fontSize: '24px',
    fontWeight: '600',
    outline: 'none',
    border: "none",
    padding: "8px",
    borderBottom: "1px solid #B4B4B4",
    backgroundColor: "transparent",
  },
  descriptionInput: {
    outline: 'none',
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: "#EFEFEF",
    resize: "none",
    lineHeight: "1.5",
  } as const
}

function TodoForm({
  todoColumnId,
  data,
}: {
  todoColumnId: Id;
  data: TodoType;
}) {
  const {
    id,
    title = "",
    description = "",
    order,
    priority,
    startDate,
    endDate,
  } = data;
  const selectedTodoCate = useRecoilValue(SelectedTodoCateStore);
  const [ values, setValues ] = useState<TodoType>({
    id: id,
    title: title,
    description: description,
    todoCateId: selectedTodoCate.id,
    todoColumnId: todoColumnId,
    priority: priority,
    order: order,
    startDate: startDate,
    endDate: endDate,
  });
  const queryClient = useQueryClient();
  const { mutate } = useUpdateTodo();

  const handleUpdate = (newValues: TodoType) => {
    mutate(newValues, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TodoQueryKey.todos, selectedTodoCate.id]
        });
      }
    });
  }

  const debouncedUpdate = useCallback(
    debounce((newValues: TodoType) => handleUpdate(newValues), 500), []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newValues = {
      ...values,
      [name]: value
    }
    setValues(newValues);

    // 디바운스 처리
    debouncedUpdate(newValues);
  }
  const handleDateChange = (date: CalendarPickerType[]) => {
    if (date.length === 0) {
      setValues({
        ...values,
        startDate: "",
        endDate: "",
      });
      return;
    };
    const newValues = {
      ...values,
      startDate: date && FormatDate(date[0].date, "YYYY-MM-DD"),
      endDate: date && FormatDate(date[1]?.date, "YYYY-MM-DD"),
    }
    setValues(newValues);

    // 디바운스 처리
    debouncedUpdate(newValues);
  }
  return (
    <form css={Style.container}>
      <input 
        css={Style.titleInput}
        type="text"
        value={values.title}
        name="title"
        placeholder="Todo"
        onChange={handleChange}
      />
      <InputWithCalendar 
        setDateValue={handleDateChange}
      />
      <InputWithPriority
        value={values.priority}
        name="priority"
        onChange={handleChange}
      />
      <Textarea 
        css={Style.descriptionInput}
        name="description"
        value={values.description}
        placeholder="Description"
        onChange={handleChange}
      />
    </form>
  );
};

export default TodoForm;