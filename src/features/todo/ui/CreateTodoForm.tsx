/** @jsxImportSource @emotion/react */

import { CalendarPickerType } from "@shared/components/calendar/model/useCalendarDate";
import { InputWithPriority, Textarea } from "@shared/components/form";
import InputWithCalendar from "@shared/components/form/ui/InputWithCalendar";
import { TodoInputType } from "@shared/db";
import { Id } from "@shared/db/model/types";
import { FormatDate } from "@shared/utils";
import { useState } from "react";

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
  } as const
}

function CreateTodoForm({
  todoColumnId,
}: {
  todoColumnId: Id;
}) {
  const [ values, setValues ] = useState<TodoInputType>({
    title: "",
    description: "",
    todoColumnId: todoColumnId,
    priority: undefined,
    order: 0,
    startDate: undefined,
    endDate: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
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
    setValues({
      ...values,
      startDate: date && FormatDate(date[0].date, "YYYY-MM-DD"),
      endDate: date && FormatDate(date[1]?.date, "YYYY-MM-DD"),
    });
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

export default CreateTodoForm;