import { FC, useMemo } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import { ActionIcon, Button, Grid, Group, Loader, Title } from "@mantine/core";
import { useRegionsCitiesList } from "../../../hooks/regions/useRegionCitiesCity";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppTable } from "../../../components/shared/AppTable";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { BackButton } from "../../../components/shared/Button";
import { usePointRemove } from "../../../hooks/points/usePointRemove";
import { AddButton } from "../../../components/shared/AddButton";

const headers = ["Название"];

export const CitiesPage: FC = () => {
  const { regionId } = useParams();
  const { cities, isLoading } = useRegionsCitiesList(Number(regionId));
  const navigate = useNavigate();
  const { handleRemove } = usePointRemove(Number(regionId));
  const rows = useMemo(() => {
    if (!cities) return [];

    return cities.map((city, i) => (
      <tr key={i}>
        <td onClick={() => navigate(String(city.id))}>
          <Grid justify="space-between" m={0}>
            {city.name}
            <Group>
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(city.id);
                }}
                color="red"
              >
                <IconTrash color="red" />
              </ActionIcon>
            </Group>
          </Grid>
        </td>
      </tr>
    ));
  }, [cities]);
  return (
    <PageRoot>
      <BackButton label="Вернуться к регионам" />
      <Title mt={"1rem"}>Города</Title>
      <Group position="right">
        <AddButton link="create" />
      </Group>
      {isLoading ? (
        <Loader />
      ) : (
        <AppTable headers={headers} rows={rows} m="1rem 0 0 0" />
      )}
    </PageRoot>
  );
};
