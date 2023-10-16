import { FC, useMemo } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import {
  ActionIcon,
  Group,
  Loader,
  Pagination,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useOperatorsList } from "../../../hooks/operators/useOperatorsList";
import { AddButton } from "../../../components/shared/AddButton";
import { AppTable } from "../../../components/shared/AppTable";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { useOperatorRemove } from "../../../hooks/operators/useOperatorRemove";

const headers: string[] = ["Email", "Имя", "Дата регистрации", ""];

export const OperatorsPage: FC = () => {
  const { data, isLoading, page, setPage, search, setSearch } =
    useOperatorsList();
  const operators = data?.data ?? [];
  const navigate = useNavigate();
  const { handleRemove } = useOperatorRemove();
  const rows = useMemo(() => {
    if (!operators) return [];

    return operators.map((operator, i) => (
      <tr key={i} onClick={() => navigate(String(operator.id))}>
        <td>{operator.email}</td>
        <td style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
          {[
            operator.lastname + " ",
            operator.firstname + " ",
            "\n",
            operator.surname,
          ].join("")}
        </td>
        <td>{dayjs(operator.createdAt).format("DD.MM.YYYY")}</td>
        <td
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Tooltip label="Удалить">
            <ActionIcon
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(operator.id);
              }}
            >
              <IconTrash color="red" />
            </ActionIcon>
          </Tooltip>
        </td>
      </tr>
    ));
  }, [operators]);

  return (
    <PageRoot>
      <Title>Операторы</Title>
      <Group position="right">
        <AddButton link="create" />
      </Group>
      <TextInput
        maw={300}
        label="Поиск"
        placeholder="Поиск"
        value={search}
        onChange={(v) => setSearch(v.target.value)}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <AppTable m="2rem 0 0 0" headers={headers} rows={rows} />
      )}
      {data?.meta.totalPages ? (
        <Pagination
          total={data?.meta.totalPages}
          value={page}
          onChange={setPage}
        />
      ) : null}
    </PageRoot>
  );
};
