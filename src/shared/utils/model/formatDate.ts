
type DateFormatType = "YYYY-MM-DD" | "YYYY/MM/DD" | "YYYY.MM.DD" | "YYYY년 MM월 DD일";

export const FormatDate = (date: Date | string, format: DateFormatType): string => {
  if (!date) {
    return "";
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${monthString}-${dayString}`;
    case "YYYY/MM/DD":
      return `${year}/${monthString}/${dayString}`;
    case "YYYY.MM.DD":
      return `${year}.${monthString}.${dayString}`;
    case "YYYY년 MM월 DD일":
      return `${year}년 ${month}월 ${day}일`;
    default:
      return "";
  }
}