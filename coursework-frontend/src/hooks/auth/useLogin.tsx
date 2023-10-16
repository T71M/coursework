import { useCallback, useId } from "react";
import { LoginData } from "../../api/types/auth";
import { useAuth } from "./useAuth";

import { useAuthStore } from "../store/useAuthStore";
import tokenStorage from "../../utils/tokenStorage";
import { api } from "../../api/userService";
import {
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { IconAt, IconLock } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useSignup } from "./useSignup";
const loginSchema = object({
  email: string().required("Oбязательное поле").email("Введите валидный email"),
  password: string()
    .required("Oбязательное поле")
    .min(4, "Минимальная длина - 4")
    .max(8, "Максимальная длина - 8"),
});

export const useLogin = () => {
  const { logIn } = useAuthStore();
  const { checkAuth } = useAuth();
  const { openSignupModal } = useSignup();
  const id = useId();
  const loginForm = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (values: LoginData) => {
    const id = toast.loading("Вход...");
    try {
      await handleLogin(values);
      toast.update(id, {
        isLoading: false,
        autoClose: 4000,
        render: "Вы успешно вошли!",
        type: "success",
      });
      modals.closeAll();
    } catch {
      loginForm.setError("email", { message: "Неверный логин или пароль" });
      toast.dismiss(id);
    }
  };

  const openAuthModal = () => {
    modals.closeAll();
    loginForm.reset();
    loginForm.clearErrors();

    modals.open({
      title: "Авторизация",
      centered: true,
      key: id,
      children: (
        <form onSubmit={loginForm.handleSubmit(onLogin)} id="login-form">
          <Title align="center">Войти</Title>
          <Controller
            control={loginForm.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                mt={"2rem"}
                label="Email"
                placeholder="email"
                icon={<IconAt />}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={loginForm.control}
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
            onClick={() => openSignupModal(openAuthModal)}
          >
            Нет аккаунта? Зарегистрироваться
          </Text>
          <Group position="center" mt={"2rem"}>
            <Button color="red" children="Войти" w={200} type="submit" />
          </Group>
        </form>
      ),
    });
  };

  const handleLogin = useCallback(
    async (values: LoginData) => {
      const response = await api.login(values);

      console.log("Token", response.data);
      tokenStorage.setToken(response.data.token);

      const user = await checkAuth();
      // console.log("[SIGN_IN]", user?.data?.data);
      if (user && user.data) {
        logIn(user.data.data);
      }
    },
    [logIn]
  );

  return {
    handleLogin,
    openAuthModal,
  };
};
