import dayjs from "dayjs";
import { Weekday } from "../api/types/routes";

const WeekDaysNumber: Record<keyof typeof Weekday, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export const getArriveDate = (
  weekday: keyof typeof Weekday,
  dateStart: string
) => {
  const date = dayjs(dateStart);

  const dayOfWeek = WeekDaysNumber[weekday]; // номер дня недели, соответствующий заданному имени
  const diff =
    date.day() <= dayOfWeek
      ? dayOfWeek - date.day()
      : 7 - date.day() + dayOfWeek;
  const nextDate = date.add(diff, "day");
  return nextDate; //
};
