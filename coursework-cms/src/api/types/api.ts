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
