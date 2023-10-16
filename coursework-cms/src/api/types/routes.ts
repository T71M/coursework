import { Bus } from "./bus";
import { Point } from "./point";

export const Weekday = {
  MONDAY: "Понедельник",
  TUESDAY: "Вторник",
  WEDNESDAY: "Среда",
  THURSDAY: "Четверг",
  FRIDAY: "Пятница",
  SATURDAY: "Суббота",
  SUNDAY: "Воскресенье",
};

export interface Route {
  id: number;
  name: string;
  startPointId: number;
  endPointId: number;
  weekDayStart: keyof typeof Weekday;
  weekDayStop: keyof typeof Weekday;
  startTime: string;
  endTime: string;
  busId: number;
  bus: Bus;
  endPoint: Point;
  startPoint: Point;
  price: number;
}

export interface CreateRouteForm {
  name: string;
  startPointId: number;
  endPointId: number;
  weekDayStart: keyof typeof Weekday;
  weekDayStop: keyof typeof Weekday;
  startTime: string;
  endTime: string;
  busId: number;
}
