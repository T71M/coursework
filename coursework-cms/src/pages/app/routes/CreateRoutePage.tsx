import { FC, useEffect } from "react";
import { PageRoot } from "../../../components/layout/PageRoot";
import { useRoute } from "../../../hooks/routes/useRoute";
import { FormProvider, useForm } from "react-hook-form";
import { Route } from "../../../api/types/routes";
import { useParams } from "react-router-dom";
import { BackButton } from "../../../components/shared/Button";
import { RouteForm } from "./components/RouteForm";
import { useCreateRoute } from "../../../hooks/routes/useCreateRoute";
import { useRouteUpdate } from "../../../hooks/routes/useRouteUpdate";

export const CreateRoutePage: FC = () => {
  const { id } = useParams();
  const { route } = useRoute(Number(id));
  const form = useForm<Route>();

  useEffect(() => {
    if (!route) return;
    form.reset(route);
  }, [route]);
  const { handleCreate } = useCreateRoute();
  const { handleUpdate } = useRouteUpdate();

  const onSubmit = async (values: Route) => {
    if (!id) {
      await handleCreate(values);
      return;
    }
    await handleUpdate(values);
  };

  return (
    <FormProvider {...form}>
      <PageRoot>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <BackButton label="Вернуться к Маршрутам" />
          <div style={{ marginTop: "2rem" }}>
            <RouteForm />
          </div>
        </form>
      </PageRoot>
    </FormProvider>
  );
};
