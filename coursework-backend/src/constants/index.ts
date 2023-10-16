export const jwtConstants = {
  secret: 'testSecret',
};

export enum APP_ROLES {
  SUPERADMIN = 1,
  OPERATOR = 2,
  USER = 3,
}

export type PaginationParams = {
  page: string;
  perPage: string;
  search?: string;
};
