import { FC, useEffect } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import { BackButton } from "../../../components/shared/Button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Bus, BusCondition } from "../../../api/types/bus";
import {
  Button,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useBusCreate } from "../../../hooks/buses/useBusCreate";
import { useBusUpdate } from "../../../hooks/buses/useBusUpdate";
import { useBus } from "../../../hooks/buses/useBus";
import { SeatsCard } from "./components/SeatsCard";
import { ComfortsBlock } from "./components/ComfortsBlock";

const conditions = Object.keys(BusCondition).map((k) => ({
  value: k,
  label: BusCondition[k as keyof typeof BusCondition],
}));

export const CreateBusPage: FC = () => {
  const form = useForm<Bus>({
    defaultValues: {
      comforts: [],
    },
  });
  const { id } = useParams();
  const { handleCreate } = useBusCreate();
  const { handleUpdate } = useBusUpdate();
  const { bus } = useBus(Number(id));

  useEffect(() => {
    if (!bus) return;
    form.reset(bus.bus);
  }, [bus]);

  const onSubmit = async (values: Partial<Bus>) => {
    if (!id) {
      await handleCreate(values as Bus);
      return;
    }
    delete values.comforts;
    await handleUpdate(values as Bus);
  };
  return (
    <PageRoot>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <BackButton label="Назад к Автобусам" />
          <Paper p={"1.5rem"} shadow="lg" mt={"2rem"}>
            <Grid m={0} sx={{ gap: 15 }}>
              <Stack>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextInput
                      {...field}
                      label="Название"
                      placeholder="Название"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="condition"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      value={field.value}
                      data={conditions}
                      label="Состояние"
                      placeholder="Состояние"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>

              <Controller
                name="seats_count"
                control={form.control}
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    label="Кол-во мест"
                    placeholder="Кол-во мест"
                    max={30}
                    min={20}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            {!id && <ComfortsBlock />}
            <Group position="right" mt={"1.5rem"}>
              <Button
                color="red"
                loading={form.formState.isSubmitting}
                type="submit"
              >
                Сохранить
              </Button>
            </Group>
          </Paper>
          {!!id && (
            <Paper mt={"2rem"} p={"1.5rem"} radius={"0.25rem"} shadow="xl">
              <Title order={2}>Удобства</Title>
              <ComfortsBlock />
            </Paper>
          )}
        </form>
      </FormProvider>
      {!!id && (
        <SeatsCard
          seats={Array.from({ length: bus?.bus.seats_count ?? 0 }, (_, i) => i)}
          mt={"2rem"}
        />
      )}
    </PageRoot>
  );
};
