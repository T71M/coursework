import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Route } from "../../../../api/types/routes";
import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { Weekday } from "../../../../api/types/routes";
import { usePointsList } from "../../../../hooks/points/usePointsList";
import { TimeInput } from "@mantine/dates";
import { useBusesList } from "../../../../hooks/buses/useBusesList";

const weekdays = Object.keys(Weekday).map((k) => ({
  value: k,
  label: Weekday[k as keyof typeof Weekday],
}));

export const RouteForm: FC = () => {
  const { control, formState } = useFormContext<Route>();
  const { points } = usePointsList();
  const { buses } = useBusesList();
  const pointsData = (points ?? []).map((point) => ({
    value: String(point.id),
    label: point.name,
  }));
  const busesData = (buses ?? []).map((bus) => ({
    value: String(bus.id),
    label: bus.name,
  }));
  return (
    <>
      <Grid sx={{ gap: 15 }} m={0}>
        <Stack>
          <Controller
            control={control}
            name="weekDayStart"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                required
                label="д. Отправления"
                value={String(field.value)}
                onChange={(v) => field.onChange(v)}
                data={weekdays}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="weekDayStop"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                required
                label="д. Прибытия"
                value={String(field.value)}
                onChange={(v) => field.onChange(v)}
                data={weekdays}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="startTime"
            render={({ field, fieldState }) => (
              <TimeInput
                {...field}
                required
                label="Время отправления"
                value={String(field.value)}
                onChange={(v) => field.onChange(v)}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="endTime"
            render={({ field, fieldState }) => (
              <TimeInput
                {...field}
                required
                label="Время прибытия"
                value={String(field.value)}
                onChange={(v) => field.onChange(v)}
                error={fieldState.error?.message}
              />
            )}
          />
        </Stack>
        <Stack>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                required
                error={fieldState.error?.message}
                label="Название"
                placeholder="Название"
              />
            )}
          />
          <Controller
            control={control}
            name="endPointId"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                required
                label="т. Назначения"
                value={String(field.value)}
                onChange={(v) => field.onChange(Number(v))}
                data={pointsData}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="busId"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Автобус"
                required
                value={String(field.value)}
                onChange={(v) => field.onChange(Number(v))}
                data={busesData}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field, fieldState }) => (
              <NumberInput
                label="Цена за билет"
                placeholder="Цена за билет ₽"
                {...field}
                error={fieldState.error?.message}
                min={1}
                max={1000}
              />
            )}
          />
        </Stack>
      </Grid>
      <Group mt={"2rem"}>
        <Button loading={formState.isSubmitting} type="submit" color="red">
          Сохранить
        </Button>
      </Group>
    </>
  );
};
