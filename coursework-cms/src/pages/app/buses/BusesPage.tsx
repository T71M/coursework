import { FC, useMemo } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import { ActionIcon, Group, Loader, Title } from "@mantine/core";
import { AddButton } from "../../../components/shared/AddButton";
import { AppTable } from "../../../components/shared/AppTable";
import { useBusesList } from "../../../hooks/buses/useBusesList";
import { BusCondition } from "../../../api/types/bus";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { useBusRemove } from "../../../hooks/buses/useBusRemove";

const headers = ["Название", "Кол-во мест", "Состояние", ""];

export const BusesPage: FC = () => {
  const { buses, isLoading } = useBusesList();
  const navigate = useNavigate();
  const { handleRemove } = useBusRemove();
  const rows = useMemo(() => {
    if (!buses) return [];

    return buses.map((bus, i) => (
      <tr key={i} onClick={() => navigate(String(bus.id))}>
        <td>{bus.name}</td>
        <td>{bus.seats_count}</td>
        <td>{BusCondition[bus.condition]}</td>
        <td>
          <Group position="right">
            <ActionIcon
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(bus.id);
              }}
            >
              <IconTrash color="red" />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  }, [buses]);
  return (
    <PageRoot>
      <Title>Автобусы</Title>
      <Group position="right">
        <AddButton link="create" />
      </Group>
      {isLoading ? <Loader /> : <AppTable headers={headers} rows={rows} />}
    </PageRoot>
  );
};
