import {
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { User } from "../../api/types/user";

import { IconAt } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useUserUpdate } from "../../hooks/user/useUserUpdate";
import { useAuthStore } from "../../hooks/store/useAuthStore";
import { useUser } from "../../hooks/user/useUser";
import { OrdersBlock } from "./components/OrdersBlock";

export const ProfilePage: FC = () => {
  const form = useForm<User>();
  const { state } = useAuthStore();
  const { user } = useUser(state.user?.id);
  useEffect(() => {
    if (!user) return;
    form.reset(user);
  }, [user]);

  const { handleUpdate } = useUserUpdate();

  const onSubmit = async (values: User) => {
    await handleUpdate(values);
  };

  return (
    <div className="root" style={{ padding: "1.5rem" }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Paper radius={"0.5rem"} p={"1.5rem"}>
          <Group>
            <Title>Профиль</Title>
          </Group>
          <Grid mt={"1rem"} sx={{ gap: "1rem" }}>
            <Stack>
              <Controller
                control={form.control}
                name="firstname"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Имя"
                    placeholder="Имя"
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="lastname"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Фамлия"
                    placeholder="Фамилия"
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="firstname"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Отчество"
                    placeholder="Отчество"
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
            <Stack>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    icon={<IconAt />}
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Text>
                Пользуетесь сервисом с{" "}
                {dayjs(user?.createdAt).format("DD.MM.YYYY")}
              </Text>
            </Stack>
          </Grid>
          <Group position="right" mt={"2rem"}>
            <Button type="submit" children="Сохранить" color="orange" />
          </Group>
        </Paper>
      </form>
      <OrdersBlock />
    </div>
  );
};
