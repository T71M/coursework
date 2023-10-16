import {
  Box,
  Button,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LoginData } from "../../../../api/types/auth";
import { IconAt, IconLock } from "@tabler/icons-react";

export const LoginCard: FC = () => {
  const form = useFormContext<LoginData>();
  return (
    <Paper shadow="xl" radius="lg" w={400} p={"4rem"}>
      <Stack align="center">
        <Title align="center">Логин</Title>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              icon={<IconAt size={18} />}
              placeholder="Email"
              label="Email"
              w={300}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordInput
              icon={<IconLock size={18} />}
              placeholder="Пароль"
              label="Пароль"
              w={300}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />
        <Button
          color="red"
          w={200}
          mt={10}
          loading={form.formState.isSubmitting}
          type="submit"
        >
          Войти
        </Button>
      </Stack>
    </Paper>
  );
};
