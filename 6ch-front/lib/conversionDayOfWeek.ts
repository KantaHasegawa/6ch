export type dayOfWeekNumber = "0" | "1" | "2" | "3" | "4" | "5" | "6"
export type dayOfWeekJapanese = "日" | "月" | "火" | "水" | "木" | "金" | "土"

const conversionDayOfWeek = (dayOfWeek: dayOfWeekNumber): dayOfWeekJapanese => {
  const DayOfWeekHash: { [key in dayOfWeekNumber]: dayOfWeekJapanese } = {
    "0": "日",
    "1": "月",
    "2": "火",
    "3": "水",
    "4": "木",
    "5": "金",
    "6": "土"
  };
  return DayOfWeekHash[dayOfWeek];
};

export default conversionDayOfWeek;
