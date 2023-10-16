import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageRoot } from "../../../components/layout/PageRoot";
import { BackButton } from "../../../components/shared/Button";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "../../../api/types/user";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperatorCreateForm } from "./components/OperatorCreateForm";
import { useOperator } from "../../../hooks/operators/useOperator";
import { useOperatorCreate } from "../../../hooks/operators/useOperatorCreate";
import { useOperatorUpdate } from "../../../hooks/operators/useUserUpdate";
import { OrdersBlock } from "../users/components/OrdersBlock";

const schema = object({
  firstname: string().required("Обязательное полe"),
  lastname: string().required("Обязательное полe"),
  surname: string().required("Обязательное полe"),
  email: string().required("Обязательное полe").email("Невалидный email"),
  password: string()
    .required("Обязательное полe")
    .min(4, "Минимальная длина - 4")
    .max(16, "Максимальная длина - 16"),
});

export const CreateOperator: FC = () => {
  const { id } = useParams();
  const { user } = useOperator(Number(id));

  const form = useForm<User>({
    resolver: yupResolver(schema),
  });

  const { handleCreate } = useOperatorCreate();
  const { handleUpdate } = useOperatorUpdate();

  const onSubmit = async (values: User) => {
    if (!id) {
      await handleCreate(values);
      return;
    }

    await handleUpdate(values);
  };

  useEffect(() => {
    if (!user) return;
    form.reset(user);
  }, [user]);

  return (
    <PageRoot>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <BackButton label="Назад к Операторам" />
          <OperatorCreateForm />
        </form>
        {!!id && <OrdersBlock />}
      </FormProvider>
    </PageRoot>
  );
};
