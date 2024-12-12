/** @jsxImportSource @emotion/react */
import { CalendarPickerType } from "../model/useCalendarDate";

const Style = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignitems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",
  } as const,
  innerContainer: {
    width: "100%",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  } as const,
  leftBg: {
    width: "50%",
    height: "100%",
    margin: "0",
    border: "none",
  } as const,
  rightBg: {
    width: "50%",
    height: "100%",
    margin: "0",
    border: "none",
  } as const,
  date: {
    width: "80%",
    height: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#E4E4E4",
    },
  } as const,
  dateText: {
    color: "#000",
  } as const,
  today: {
    backgroundColor: "#384151",
  } as const,
  picked: {
    backgroundColor: "#272B32",
    color: "#fff",
  } as const,
  between: {
    backgroundColor: "#000",
    color: "#fff",
  } as const,
  text: {
    color: "#000",
  } as const,
  textGray: {
    color: "#B4B4B4",
  } as const,
  textWhite: {
    color: "#fff",
  } as const,
};

const DayPicker = ({
  currentMonth,
  day,
  selectedDate,
  onClick,
}: {
  currentMonth: number;
  day: CalendarPickerType;
  selectedDate: CalendarPickerType[];
  onClick: (date: Date) => void;
}) => {
  selectedDate.map(({ date }) => date.setHours(0, 0, 0, 0));
  const isToday = day.date.toDateString() === new Date().toDateString();
  const isPicked = selectedDate.some(({ date }) => date.getTime() === day.date.getTime());
  const isBetween = selectedDate.length === 2 && selectedDate[0].date.getTime() < day.date.getTime() && day.date.getTime() < selectedDate[1].date.getTime();
  // 좌측 배경색 설정
  const leftBgColor = () => {
    if (isPicked && selectedDate[1]?.date.getTime() === day.date.getTime() && selectedDate.length === 2) {
      return { backgroundColor: "#5C6B8A" };
    }
    if (isBetween) {
      return { backgroundColor: "#5C6B8A" };
    }
    return {}; // 기본값
  };

  // 우측 배경색 설정
  const rightBgColor = () => {
    if (isPicked && selectedDate[0]?.date.getTime() === day.date.getTime() && selectedDate.length === 2) {
      return { backgroundColor: "#5C6B8A" };
    }
    if (isBetween) {
      return { backgroundColor: "#5C6B8A" };
    }
    return {}; // 기본값
  };

  const dateColor = () => {
    if (day.date.getMonth() + 1 < currentMonth) {
      return { color: "#d9d9d9" };
    }
    if (day.date.getMonth() + 1 > currentMonth) {
      return { color: "#384151" };
    }
    if (isBetween) {
      return {
        color: "#fff",
      };
    }
    return {};
  }


  return (
    <div
      onClick={() => onClick(day.date)}
      css={Style.container}
      className="flex flex-row items-center justify-center relative cursor-pointer"
    >
      <div
        css={Style.innerContainer}
        className="w-full h-[80%] flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      >
        <div 
          css={{...Style.leftBg, ...leftBgColor()}}
          className={`
            w-[50%] 
            h-full
            margin-0
            border-none
            ${leftBgColor()}
          `}
        />
        <div 
          css={{...Style.rightBg, ...rightBgColor()}}
          className={`
            w-[50%] 
            h-full
            margin-0
            border-none
            ${rightBgColor()}
          `}
        />
        <div
          css={{...Style.date, ...dateColor(), ...(isPicked ? Style.textWhite : {}), ...(isToday ? Style.today : {}), ...(isPicked ? Style.picked : {})}}
          className={`
            w-[80%] 
            h-full 
            absolute 
            top-1/2 
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-1/2 
            rounded-full 
            text-center 
            flex 
            justify-center
            items-center
            hover:bg-slate-300
            hover:text-slate-700
            ${dateColor()}
            ${isPicked ? "text-white bg-slate-700" : isToday ? "bg-slate-300" : ""}
          `}
        >
          {day.date.getDate()}
        </div>
      </div>
    </div>
  );
};

export default DayPicker;