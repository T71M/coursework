import {
  IconBuilding,
  IconBus,
  IconHeadset,
  IconRoute,
  IconUser,
} from "@tabler/icons-react";

interface Menu {
  title: string;
  link: string;
  permission?: boolean;
  icon: JSX.Element;
}

export const menus: Menu[] = [
  {
    title: "Регионы",
    link: "/regions",
    icon: <IconBuilding />,
  },
  {
    title: "Операторы",
    link: "/operators",
    icon: <IconHeadset />,
    permission: true,
  },
  {
    title: "Автобусы",
    link: "/buses",
    icon: <IconBus />,
  },
  {
    title: "Маршруты",
    link: "/routes",
    icon: <IconRoute />,
  },
  {
    title: "Пользователи",
    link: "/users",
    icon: <IconUser />,
  },
];
