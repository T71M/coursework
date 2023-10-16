import { AppRoles } from "../api/types/user";

export const getRole = (roleId?: AppRoles) => {
  if (!roleId) return;
  const roles = {
    1: "СуперАдмин",
    2: "Оператор",
    3: "Пользователь",
  };

  return roles[roleId];
};
