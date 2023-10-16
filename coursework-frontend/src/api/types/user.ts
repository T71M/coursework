export interface User {
  id: number;

  firstname: string;

  lastname: string;

  surname: string;

  createdAt: Date;

  email: string;

  roleId: number;

  password: string;

  iat: number;

  exp: number;
}

export enum AppRoles {
  Superadmin = 1,
  Operator = 2,
  User = 3,
}
