/** @jsxImportSource @emotion/react */
import { CalendarPicker } from "@shared/components/calendar";
import { CalendarPickerType } from "@shared/components/calendar/model/useCalendarDate";
import { CalendarIcon } from "@shared/icon";

import { useEffect, useState, useCallback } from "react";

const InputWithCalendar = ({
  setDateValue
}: {
  setDateValue: (date: CalendarPickerType[]) => void;
}) => {
  const [date, setDate] = useState<CalendarPickerType[]>([]);
  const [text, setText] = useState<string>(
    date.length > 0 ? `${date[0].date.getFullYear()}-${date[0].date.getMonth() + 1}-${date[0].date.getDate()}` : ""
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [clickX, setClickX] = useState<number>(0);
  const [clickY, setClickY] = useState<number>(0);

  const handleCalendarClose = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // 캘린더 외부 클릭 시 닫기
    if (!target.closest(".calendar-container")) {
      setIsCalendarOpen(false);
      document.removeEventListener("click", handleCalendarClose);
    }
  }, []);

  const handleCalendarOpen = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setIsCalendarOpen(true);

    // 클릭 좌표
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const viewportWidth = window.innerWidth; // 브라우저 뷰포트 너비
    const calendarWidth = 250; // 캘린더 예상 너비 (px)
  
    // 오른쪽 끝과 비교하여 위치 조정
    if (viewportWidth - clientX < calendarWidth) {
      setClickX(clientX - rect.left - calendarWidth); // `right`로 기준 설정
    } else {
      setClickX(clientX - rect.left); // `left`로 기준 설정
    }
    setClickY(clientY - rect.top); // 요소의 아래쪽 Y 좌표 (아래쪽에 렌더링)
  
    // 캘린더 닫기 이벤트 등록
    document.addEventListener("click", handleCalendarClose);
  };

  

  useEffect(() => {
    console.log(date);
    setDateValue(date);
    if (date.length === 0) {
      setText("");
      return;
    }
    if (date.length === 1) {
      setText(
        `${date[0].date.getFullYear()}.${date[0].date.getMonth() + 1}.${date[0].date.getDate()}`
      );
      return;
    }
    if (date.length === 2) {
      setText(
        `${date[0].date.getFullYear()}.${date[0].date.getMonth() + 1}.${date[0].date.getDate()} ~ ${date[1].date.getFullYear()}.${date[1].date.getMonth() + 1}.${date[1].date.getDate()}`
      );
      return;
    }
  }, [date]);

  return (
    <div
      css={{
        position: "relative",
        "&:hover": {
          backgroundColor: "#F3F4F6",
        },
        borderRadius: "0.375rem",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <div 
        css={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          padding: "0.5rem",
          width: "100%",
          alignItems: "center",
        }}
        
        onClick={handleCalendarOpen}
      >
        <CalendarIcon />
        <input 
          type="text" 
          css={{
            height: "30px",
            width: "100%",
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
          value={text}
          placeholder="날짜 선택"
          readOnly
        />
      </div>
      {isCalendarOpen && (
        <div 
        css={{
          position: "absolute",
          width: "fit-content",
        }}
        className={`w-fit absolute calendar-container`}
        style={
          window.innerWidth - clickX < 200
            ? { top: `${clickY}px`, right: `${clickX}px` } // 오른쪽 위치 기준
            : { top: `${clickY}px`, left: `${clickX}px` } // 왼쪽 위치 기준
        }
        >
          <CalendarPicker defaultDate={date} setDate={setDate} />
        </div>
      )}
    </div>
  );
};

export default InputWithCalendar;
