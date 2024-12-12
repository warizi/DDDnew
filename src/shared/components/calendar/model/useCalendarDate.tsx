import { useState } from "react";

export type CalendarPickerType = {
  date: Date;
  data: any;
}

const useCalendarDate = (calendarDate?: CalendarPickerType[]) => {
  const [ displayDate, setDisplayDate ] = useState<Date>((calendarDate && calendarDate[0]?.date) ?? new Date());
  const [ selectedDate, setSelectedDate ] = useState<CalendarPickerType[]>(calendarDate ? calendarDate : []);

  const handlePrevMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayDate(newDate);
  }
  const handleNextMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayDate(newDate);
  }
  const handleToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화
  
    setDisplayDate(today); // displayDate를 오늘로 설정
    setSelectedDate([]);
  };
  
  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const prevLastDay = new Date(year, month, 0).getDate();

    const days = [];

    if (firstDay === 0) {
      for (let i = 6; i >= 0; i--) {
        const newPrevPickerData = {
          date: new Date(year, month - 1, prevLastDay - i),
          data: {}
        }
        days.push(newPrevPickerData);
      }
    } else {
        for (let i = firstDay - 1; i >= 0; i--) {
          const newPrevPickerData = {
            date: new Date(year, month - 1, prevLastDay - i),
            data: {}
          }
          days.push(newPrevPickerData);
        }
    }

    for (let i = 1; i <= lastDay; i++) {
      const newPickerData = {
        date: new Date(year, month, i),
        data: {}
      }
      days.push(newPickerData);
    }

    const totalDays = 42;
    const nextMonthDays = totalDays - days.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      const newNextPickerData = {
        date: new Date(year, month + 1, i),
        data: {}
      }
      days.push(newNextPickerData);
    }

    return days;
  }

  const handlePickDate = (date: Date) => {
    setSelectedDate((prevSelectedDate) => {
      const findIndex = prevSelectedDate.findIndex(
        (item) => item.date.getTime() === date.getTime()
      );
  
      // 이미 선택한 날짜를 제거
      if (findIndex !== -1) {
        return prevSelectedDate.filter((_, index) => index !== findIndex);
      }
  
      // 최대 2개를 초과할 경우 가장 가까운 날짜를 제거 후 추가
      if (prevSelectedDate.length === 2) {
        const diff = prevSelectedDate.map(
          (item) => Math.abs(item.date.getTime() - date.getTime())
        );
        const minIndex = diff.indexOf(Math.min(...diff));

        const newSelectedDate = [
          ...prevSelectedDate.filter((_, index) => index !== minIndex),
          { date, data: {} },
        ];
        const sortedSelectedDate = newSelectedDate.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
        return sortedSelectedDate;
      }
  
      // 새로운 날짜 추가
      const newSelectedDate = [...prevSelectedDate, { date, data: {} }];
      const sortedSelectedDate = newSelectedDate.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
      return sortedSelectedDate;
    });
  };
  

  return {
    handleNextMonth,
    handleToday,
    handlePrevMonth,
    year: displayDate.getFullYear(),
    month: displayDate.getMonth() + 1,
    days: getCalendarDays(displayDate.getFullYear(), displayDate.getMonth()),
    selectedDate,
    handlePickDate
  }
};

export default useCalendarDate;