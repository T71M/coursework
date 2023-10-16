import { FC, useMemo } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import {
  ActionIcon,
  Group,
  Loader,
  Pagination,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { AddButton } from "../../../components/shared/AddButton";
import { AppTable } from "../../../components/shared/AppTable";
import { useRoutesList } from "../../../hooks/routes/useRoutesList";
import { Weekday } from "../../../api/types/routes";
import { usePointsList } from "../../../hooks/points/usePointsList";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { useRouteRemove } from "../../../hooks/routes/useRouteRemove";

const headers: string[] = [
  "Название",
  "т. Отправления",
  "т. Назначения",
  "Отправление",
  "Прибытие",
  "Цена за билет",
  "",
];

const weekdays = Object.keys(Weekday).map((k) => ({
  value: k,
  label: Weekday[k as keyof typeof Weekday],
}));

const CustomDropdown = ({ children }: { children: React.ReactNode }) => {
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    console.debug(event);
  };

  return (
    <div
      style={{
        maxHeight: "200px",
        overflowY: "scroll",
        width: "100%",
      }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export const RoutesPage: FC = () => {
  const {
    data,
    query,
    setQuery,
    setWeekDayEnd,
    weekDayEnd,
    weekDayStart,
    setWeekDayStart,
    endPointId,
    setEndPoint,
    setPage,
    page,
    isLoading,
  } = useRoutesList();
  const { points } = usePointsList();
  const navigate = useNavigate();
  const { handleRemove } = useRouteRemove();
  const routes = data?.data ?? [];
  const rows = useMemo(() => {
    if (!routes) return [];

    return routes.map((route, i) => (
      <tr key={i} onClick={() => navigate(String(route.id))}>
        <td>{route.name}</td>
        <td>{route.startPoint.name}</td>
        <td>{route.endPoint.name}</td>
        <td>
          {Weekday[route.weekDayStart]} <br /> {route.startTime}
        </td>
        <td>
          {Weekday[route.weekDayStop]} <br /> {route.endTime}
        </td>
        <td>{route.price}₽</td>
        <td>
          <Group position="right">
            <ActionIcon
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(route.id);
              }}
            >
              <IconTrash color="red" />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  }, [routes]);

  const pointsData = (points ?? []).map((point) => ({
    value: String(point.id),
    label: point.name,
  }));

  return (
    <PageRoot>
      <Title>Маршруты</Title>
      <Group mt={"2rem"} position="right">
        <AddButton />
      </Group>
      <Group mb={"2.5rem"} mt={"2rem"}>
        <TextInput
          w={200}
          label="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          w={200}
          allowDeselect
          label="День Отправления"
          value={weekDayStart}
          data={weekdays}
          onChange={(v) => setWeekDayStart(v as any)}
        />
        <Select
          w={200}
          allowDeselect
          label="День Прибытия"
          value={weekDayEnd}
          data={weekdays}
          onChange={(v) => setWeekDayEnd(v as any)}
        />

        <Select
          w={200}
          allowDeselect
          clearable
          label="т. Назначения"
          dropdownComponent={CustomDropdown}
          value={String(endPointId)}
          data={pointsData}
          onChange={(v) => {
            if (v === null) {
              setEndPoint(null);
              return;
            }
            setEndPoint(Number(v));
          }}
        />
      </Group>
      {isLoading ? <Loader /> : <AppTable headers={headers} rows={rows} />}
      {data?.meta.totalPages ? (
        <Pagination
          mt={"2em"}
          total={data?.meta.totalPages}
          value={page}
          onChange={setPage}
        />
      ) : null}
    </PageRoot>
  );
};
