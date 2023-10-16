import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { User } from "../../../../api/types/user";
import {
  Button,
  Grid,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

export const OperatorCreateForm: FC = () => {
  const { control, formState } = useFormContext<User>();
  const { id } = useParams();

  return (
    <>
      <Grid sx={{ gap: 30 }} mt={"2rem"}>
        <Grid.Col span={"content"}>
          <Stack spacing={10}>
            <Controller
              control={control}
              name="lastname"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Фамилия"
                  {...field}
                  w={250}
                  error={fieldState.error?.message}
                  placeholder="Фамилия"
                />
              )}
            />
            <Controller
              control={control}
              name="firstname"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Имя"
                  placeholder="Имя"
                  w={250}
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="surname"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Отчество"
                  placeholder="Отчество"
                  w={250}
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Stack spacing={10}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Email"
                  placeholder="Email"
                  icon={<IconAt />}
                  w={250}
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />
            {!id && (
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <PasswordInput
                    label="Пароль"
                    placeholder="Пароль"
                    icon={<IconLock />}
                    w={250}
                    {...field}
                    error={fieldState.error?.message}
                  />
                )}
              />
            )}
          </Stack>
        </Grid.Col>
      </Grid>

      <Button
        mt={"2rem"}
        w={250}
        color="red"
        type="submit"
        loading={formState.isSubmitting}
      >
        Сохранить
      </Button>
    </>
  );
};
