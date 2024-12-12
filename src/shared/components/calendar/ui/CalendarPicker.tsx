/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import useCalendarDate, { CalendarPickerType } from "../model/useCalendarDate";
import CalendarPickerHeader from "./CalendarPickerHeader";
import DayPicker from "./DayPicker";

const CalendarPicker = ({
  defaultDate,
  setDate
}: {
  defaultDate: CalendarPickerType[];
  setDate: (date: CalendarPickerType[]) => void;
}) => {
  const {
    year,
    month,
    handleNextMonth,
    handleToday,
    handlePrevMonth,
    days,
    handlePickDate,
    selectedDate
  } = useCalendarDate(defaultDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate])
  return (
    <div
      css={{
        width: "250px",
        height: "250px",
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="w-[250px] h-[250px] bg-white overflow-hidden rounded-md flex flex-col shadow-md"
    >
      <CalendarPickerHeader 
        year={year}
        month={month}
        todayFn={handleToday}
        nextMonthFn={handleNextMonth}
        prevMonthFn={handlePrevMonth}
      />
      <div 
        css={{
          width: "100%",
          height: "calc(100% - 40px)",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
        className="w-full h-full grid grid-cols-7"
      >
        {days.map((day, index) => (
          <DayPicker 
            key={index}
            day={day}
            selectedDate={selectedDate}
            currentMonth={month}
            onClick={handlePickDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarPicker;