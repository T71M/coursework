import { FC, useEffect } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { BackButton } from "../../../components/shared/Button";
import { Controller, useForm } from "react-hook-form";
import { CreateRegionForm } from "../../../api/types/regions";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegionCreate } from "../../../hooks/regions/useRegionCreate";
import { Link, useParams } from "react-router-dom";
import { useRegion } from "../../../hooks/regions/useRegion";
import { useRegionUpdate } from "../../../hooks/regions/useRegionUpdate";

const schema = object({
  name: string().required("Обязательное поле").min(3, "Минимальная длина - 3"),
});

export const CreateRegionPage: FC = () => {
  const form = useForm<CreateRegionForm>({
    resolver: yupResolver(schema),
  });
  const { regionId } = useParams();
  const { handleCreate } = useRegionCreate();
  const { handleUpdate } = useRegionUpdate();
  const { region, isLoading } = useRegion(Number(regionId));

  const onSubmit = async (values: CreateRegionForm) => {
    if (!regionId) {
      await handleCreate(values);
      return;
    }
    await handleUpdate({ id: Number(regionId), name: values.name });
  };

  useEffect(() => {
    if (!region) return;
    form.reset(region);
  }, [region]);

  return (
    <PageRoot>
      <form onSubmit={form.handleSubmit(onSubmit, (e) => console.debug(e))}>
        <BackButton label="Вернуться к Регионам" />
        <Box mt={"1.5rem"}>
          <Group align="end" spacing={15}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Название"
                  placeholder="Название"
                  w={300}
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
            <div>
              {!!regionId && (
                <Button color="yellow" component={Link} to={"cities"}>
                  Просмотреть города
                </Button>
              )}
            </div>
          </Group>

          <Button
            mt={"1rem"}
            type="submit"
            color="red"
            loading={form.formState.isSubmitting || isLoading}
          >
            {!regionId ? "Создать" : "Редактировать"}
          </Button>
        </Box>
      </form>
    </PageRoot>
  );
};
