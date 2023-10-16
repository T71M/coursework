import { FC, useMemo } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Loader,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useRegionsList } from "../../../hooks/regions/useRegionsList";
import { AppTable } from "../../../components/shared/AppTable";
import { IconMapPin, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegionRemove } from "../../../hooks/regions/useRegionRemove";

const headers = ["Название"];

export const RegionsPage: FC = () => {
  const { regions, isLoading } = useRegionsList();
  const { handleRemove } = useRegionRemove();
  const navigate = useNavigate();
  const rows = useMemo(() => {
    if (!regions) return [];
    return regions.map((region, i) => (
      <tr key={i}>
        <td onClick={() => navigate(`region/${region.id}`)}>
          <Grid m={0} justify="space-between">
            <Text>{region.name}</Text>
            <Group spacing={5}>
              <Tooltip label="Города">
                <ActionIcon
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`region/${region.id}/cities`);
                  }}
                >
                  <IconMapPin color="blue" />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Удалить">
                <ActionIcon
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(region.id);
                  }}
                >
                  <IconTrash color="red" />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Grid>
        </td>
      </tr>
    ));
  }, [regions]);
  return (
    <PageRoot>
      <Title order={1}>Регионы</Title>
      <Group position="right">
        <Button component={Link} color="yellow" w={"fit-content"} to={"create"}>
          <Group spacing={10}>
            <IconPlus /> Добавить
          </Group>
        </Button>
      </Group>
      {isLoading ? (
        <Loader />
      ) : (
        <AppTable headers={headers} rows={rows} m="1rem 0rem 0rem 0rem" />
      )}
    </PageRoot>
  );
};
