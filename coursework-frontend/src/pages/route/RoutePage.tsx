import {
  Button,
  Grid,
  Group,
  Loader,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRoute } from "../../hooks/routes/useRoute";
import { ProjectNavigation } from "../../router/ProjectRoutes";
import dayjs from "dayjs";
import { IconArrowRightRhombus, IconClockFilled } from "@tabler/icons-react";
import { Weekday } from "../../api/types/api";
import { getSeatColors } from "../../utils/getSeatColors";
import { SeatsCard } from "../../components/SeatsCard";

import { modals } from "@mantine/modals";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAuthStore } from "../../hooks/store/useAuthStore";
import { useOrderCreate } from "../../hooks/orders/useOrderCreate";
import { Order } from "../../api/types/order";
import { useId } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getArriveDate } from "../../utils/getArriveDate";

export const RoutePage = () => {
  const { id } = useParams();
  const modalId = useId();
  const errorModalId = useId();
  const [params] = useSearchParams();
  const date = params.get("date") ? params.get("date") : undefined;
  const { route, isLoading } = useRoute(Number(id), date);
  const navigate = useNavigate();
  const { state } = useAuthStore();
  const { openAuthModal } = useLogin();

  const { handleCreate, isLoading: isBuying } = useOrderCreate();
  const getMaxSeats = () => {
    if (!route) return 0;

    return route!.freeSeats > 4 ? 4 : route!.freeSeats;
  };
  const schema = object({
    seats: number().min(1).max(getMaxSeats()),
  });
  const form = useForm<{ seats: number | "" }>({
    defaultValues: { seats: 1 },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ seats }: { seats: number | "" }) => {
    const data = {
      routeId: route!.id,
      userId: state.user!.id,
      seat_count: seats,
      date: date,
    } as Partial<Order>;

    await handleCreate(data as Order);
    form.reset({ seats: 1 });
  };

  useEffect(() => {
    if (!id || !date) {
      navigate(ProjectNavigation.Home);
    }
  }, [id]);

  if (isLoading) {
    return <Loader color="yellow" />;
  }

  // useEffect(() => {
  //   if (isError) {
  //     navigate(ProjectNavigation.Home);
  //   }
  // }, [isError]);

  const getDatesDiff = () => {
    const startTime = route!.startTime.split(":");
    const endTime = route!.endTime.split(":");

    const date1 = dayjs(date)
      .set("hour", Number(startTime[0]))
      .set("minute", Number(startTime[1]));

    const date2 = getArriveDate(route!.weekDayStop, date!)
      .set("hour", Number(endTime[0]))
      .set("minute", Number(endTime[1]));

    const diffInMinutes = date2.diff(date1, "minute"); // разница между датами в минутах
    const hours = Math.floor(diffInMinutes / 60); // получаем количество часов
    const minutes = diffInMinutes % 60; // получаем количество минут
    return `${hours}ч ${String(minutes)}мин в \n пути`;
  };

  const onBuyClick = () => {
    if (!state.isLoggedIn) {
      return modals.openConfirmModal({
        title: "Ошибка",
        id: errorModalId,
        centered: true,
        color: "red",
        children: (
          <>
            <Text>Вы должны авторизоваться чтобы забронировать билет!</Text>
          </>
        ),
        labels: { confirm: "Авторизоваться", cancel: "Отменить" },
        onConfirm: openAuthModal,
      });
    }

    return modals.openConfirmModal({
      title: "Бронирование",
      centered: true,
      key: modalId,
      keepMounted: true,
      labels: { confirm: "Забронировать", cancel: "Отменить" },
      confirmProps: { loading: isBuying },
      onConfirm: form.handleSubmit(onSubmit),
      children: (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Title order={3}>Бронирование</Title>
          <Controller
            name="seats"
            control={form.control}
            render={({ field, fieldState }) => (
              <NumberInput
                mt={"1.25rem"}
                {...field}
                error={fieldState.error?.message}
                startValue={1}
                min={0}
                max={getMaxSeats()}
                placeholder="Количестов мест"
                label="Кол-во мест."
              />
            )}
          />
        </form>
      ),
    });
  };

  return (
    <div
      className="root"
      style={{ padding: "1rem", gap: "1rem", alignItems: "center" }}
    >
      <Stack w={"100%"} maw={1000}>
        <Paper radius={"0.5rem"} p={"2rem"} shadow="xl" w={"100%"}>
          <Group align="center">
            <Title>Рейс</Title>
            <Title order={2}>{route!.startPoint.name}</Title>
            <IconArrowRightRhombus
              fontSize={"3rem"}
              size={"3.5rem"}
              style={{ marginTop: "0.25rem" }}
              color="orange"
            />
            <Title order={2}>{route?.endPoint.name}</Title>
          </Group>
          <Grid mt={"2rem"} align="start" justify="space-between">
            <Group spacing={"xl"} align="center">
              <div>
                <Text weight={700} align="center">
                  {route?.startTime}
                </Text>
                <Text>
                  {Weekday[route!.weekDayStart]}{" "}
                  {dayjs(date).format("DD.MM.YYYY")}
                </Text>
              </div>
              <div>
                <Text align="center">
                  <IconClockFilled />
                </Text>
                <Text
                  sx={{ whiteSpace: "pre-line", textAlign: "center" }}
                  weight={700}
                >
                  {getDatesDiff()}
                </Text>
              </div>

              <div>
                <Text weight={700} align="center">
                  {route?.endTime}
                </Text>
                <Text>
                  {Weekday[route!.weekDayStop]}{" "}
                  {getArriveDate(route!.weekDayStop, date!).format(
                    "DD.MM.YYYY"
                  )}{" "}
                </Text>
              </div>
            </Group>

            <Title>{route?.price}₽</Title>
          </Grid>
        </Paper>
        <Paper radius={"0.5rem"} shadow="xl" p={"2rem"}>
          <Group align="center">
            <Title>Схема</Title>
            <Text
              mt={"0.35rem"}
              color={getSeatColors(route!.bus.seats_count, route!.freeSeats)}
            >
              {" "}
              {route!.freeSeats} Свободных мест
            </Text>
          </Group>
          <SeatsCard
            seats={Array.from(
              { length: route?.bus.seats_count ?? 0 },
              (_, i) => i
            )}
            mt={"2rem"}
          />
        </Paper>
        <Group position="right" mt={"2rem"}>
          <Button
            color="orange"
            children="Забронировать"
            disabled={!route || route.freeSeats < 1}
            onClick={() => onBuyClick()}
          />
        </Group>
      </Stack>
    </div>
  );
};
