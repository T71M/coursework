import { useCallback } from "react";
import { useAuth } from "./useAuth";

import { useAuthStore } from "../store/useAuthStore";
import tokenStorage from "../../utils/tokenStorage";
import { api } from "../../api/userService";
import { User } from "../../api/types/user";
import { modals } from "@mantine/modals";
import {
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useId } from "@mantine/hooks";

const signupSchema = object({
  email: string().required("Oбязательное поле").email("Введите валидный email"),
  password: string()
    .required("Oбязательное поле")
    .min(4, "Минимальная длина - 4")
    .max(8, "Максимальная длина - 8"),
  firstname: string().required("Oбязательное поле"),
  lastname: string().required("Oбязательное поле"),
  surname: string().required("Oбязательное поле"),
});

export const useSignup = () => {
  const { logIn } = useAuthStore();
  const { checkAuth } = useAuth();
  const id = useId();
  const signupForm = useForm<User>({
    resolver: yupResolver(signupSchema),
  });

  const onSignup = async (values: User) => {
    const id = toast.loading("Регистрация...");
    try {
      await handleSignup(values);
      toast.update(id, {
        isLoading: false,
        autoClose: 4000,
        render: "Успешная регистрация!",
        type: "success",
      });
      modals.closeAll();
    } catch {
      signupForm.setError("email", { message: "Неверный логин или пароль" });
      toast.dismiss(id);
    }
  };

  const openSignupModal = (openAuthModal: () => void) => {
    modals.closeAll();
    signupForm.reset();
    signupForm.clearErrors();
    modals.open({
      title: "Авторизация",
      centered: true,
      key: id,
      children: (
        <form
          id="register-form"
          onSubmit={signupForm.handleSubmit(onSignup, (e) => console.debug(e))}
        >
          <Title align="center">Регистрация</Title>
          <Controller
            control={signupForm.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                mt={"2rem"}
                label="Email"
                placeholder="email"
                icon={<IconAt />}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={signupForm.control}
            name="firstname"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                mt={"2rem"}
                onChange={(e) => {
                  field.onChange(e);
                }}
                label="Имя"
                placeholder="Имя"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={signupForm.control}
            name="lastname"
            render={({ field, fieldState }) => (
              <TextInput
                mt={"2rem"}
                label="Фамилия"
                placeholder="Фамилия"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={signupForm.control}
            name="surname"
            render={({ field, fieldState }) => (
              <TextInput
                mt={"2rem"}
                label="Отчество"
                placeholder="Отчество"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={signupForm.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Пароль"
                placeholder="Пароль"
                icon={<IconLock />}
                {...field}
                mt={"1rem"}
                error={fieldState.error?.message}
              />
            )}
          />
          <Text
            size={"xs"}
            mt={"0.5rem"}
            align="end"
            color="blue"
            sx={{ cursor: "pointer" }}
            onClick={() => openAuthModal()}
          >
            Есть аккаунт? Войти
          </Text>
          <Group position="center" mt={"2rem"}>
            <Button color="red" children="Регистрация" w={200} type="submit" />
          </Group>
        </form>
      ),
    });
  };

  const handleSignup = useCallback(
    async (values: User) => {
      const response = await api.signUp(values);
      console.debug(response);

      console.log("Token", response.token);
      tokenStorage.setToken(response.token);

      const user = await checkAuth();
      console.log("[SIGN_IN]", user?.data?.data);
      if (user && user.data) {
        logIn(user.data.data);
      }
    },
    [logIn]
  );

  return {
    handleSignup,
    openSignupModal,
  };
};
