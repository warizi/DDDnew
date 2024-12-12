/** @jsxImportSource @emotion/react */
import { LeftIcon, RightIcon } from "@shared/icon";


const CalendarPickerHeader = ({
  year,
  month,
  todayFn,
  nextMonthFn,
  prevMonthFn,
}: {
  year: number;
  month: number;
  todayFn: () => void;
  nextMonthFn: () => void;
  prevMonthFn: () => void;
}) => {

  return (
    <div 
      css={{
        width: "100%",
        height: "40px",
        backgroundColor: "#E5E7EB",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 8px",
        justifyContent: "space-between",
      }}
      className="w-full h-[40px] bg-slate-300 flex flex-row items-center p-2 justify-between"
    >
      <span 
        css={{
          width: "65px",
        }}
        className="w-[65px]"
      >
        {year}. {month}
      </span>
      <div>
        <button 
          css={{
            backgroundColor: "#fff",
            padding: "4px",
            borderRadius: "4px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }}
          type="button"
          onClick={todayFn}
        >
          Today
        </button>
      </div>
      <div 
        css={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
        className="flex flex-row gap-2"
      >
        <button 
          css={{
            padding: "4px",
            borderRadius: "4px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
            stroke: "#000",
          }}
          type="button"
          onClick={prevMonthFn}
          className="p-1"
        >
          <LeftIcon />
        </button>
        <button 
          css={{
            padding: "4px",
            borderRadius: "4px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
            stroke: "#000",
          }}
          type="button"
          onClick={nextMonthFn}
          className="p-1"
        >
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarPickerHeader;