import "./App.css";
import { BrowserRouter as Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store/store";
import { MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProjectRoutes } from "./router/ProjectRoutes";
import { ModalsProvider } from "@mantine/modals";
import "react-toastify/dist/ReactToastify.css";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ru";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider
      theme={{
        globalStyles: () => ({
          fontFamily: "Roboto",
        }),
      }}
    >
      <DatesProvider settings={{ locale: "ru" }}>
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <ReduxProvider store={store}>
              <ToastContainer />
              <Routes>
                <ProjectRoutes />
              </Routes>
            </ReduxProvider>
          </QueryClientProvider>
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
export default App;
