import { FC } from "react";
import { useLogin } from "../../../hooks/auth/useLogin";
import { PageRoot } from "../../../components/layout/PageRoot";
import { LoginCard } from "./components/LoginCard";
import { FormProvider, useForm } from "react-hook-form";
import { LoginData } from "../../../api/types/auth";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = object({
  email: string().required("Обязательное поле").email("Невалидный email"),
  password: string()
    .min(4, "Минимальная длина пароля - 4")
    .max(16, "Максимальная длина 16"),
});

export const LoginPage: FC = () => {
  const { handleLogin } = useLogin();

  const form = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginData) => {
    const notif = toast.loading("Вход", {
      autoClose: false,
      closeButton: false,
    });
    try {
      await handleLogin(values);
      toast.dismiss(notif);
    } catch (e) {
      form.setError("email", { message: "Неправильный логин или пароль" });
      toast.update(notif, {
        type: "error",
        isLoading: false,
        render: "Неправильный логин или пароль",
        autoClose: 4000,
        closeButton: true,
      });
    }
  };

  return (
    <form
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      onSubmit={form.handleSubmit(onSubmit, (e) => {
        console.debug(form.getValues());
      })}
    >
      <FormProvider {...form}>
        <PageRoot
          bg={"yellow"}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <LoginCard />
        </PageRoot>
      </FormProvider>
    </form>
  );
};
