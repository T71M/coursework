import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageRoot } from "../../../components/layout/PageRoot";
import { usePoint } from "../../../hooks/points/usePoint";
import { BackButton } from "../../../components/shared/Button";
import { Box, Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Point } from "../../../api/types/point";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePointCreate } from "../../../hooks/points/usePointCreate";
import { usePointUpdate } from "../../../hooks/points/usePointUpdate";

const schema = object({
  name: string().min(3, "Минимальная длина - 3"),
});

export const PointPage: FC = () => {
  const { cityId, regionId } = useParams();
  const { point, isLoading } = usePoint(Number(cityId));
  const form = useForm<Point>({
    resolver: yupResolver(schema),
  });
  const { handleCreate } = usePointCreate(Number(regionId));
  const { handleUpdate } = usePointUpdate(Number(regionId));

  const onSubmit = async (values: Point) => {
    if (!cityId) {
      values.regionId = Number(regionId);
      await handleCreate(values);
      return;
    }
    await handleUpdate(values);
  };

  useEffect(() => {
    if (!point) return;
    form.reset(point);
  }, [point]);

  return (
    <PageRoot>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BackButton label="Вернуться к городам" />
        <Box mt={"2rem"}>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput w={300} {...field} error={fieldState.error?.message} />
            )}
          />
          <Button mt={"1rem"} color="red" type="submit" loading={isLoading}>
            Сохранить
          </Button>
        </Box>
      </form>
    </PageRoot>
  );
};
