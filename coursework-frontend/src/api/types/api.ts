import { User } from "./user";

export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type RegisterResponse = {
  user: User;
  token: string;
};

type MetaResponse = {
  totalItems: number;
  totalPages: number;
};

export type ListResponse<T> = {
  meta: MetaResponse;
  data: T[];
};

export const Weekday = {
  MONDAY: "Понедельник",
  TUESDAY: "Вторник",
  WEDNESDAY: "Среда",
  THURSDAY: "Четверг",
  FRIDAY: "Пятница",
  SATURDAY: "Суббота",
  SUNDAY: "Воскресенье",
};
