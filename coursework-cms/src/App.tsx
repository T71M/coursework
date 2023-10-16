import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import store from "./store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./utils/AuthProvider";
import { PublicRoutes } from "./router/PublicRoutes";
import { SecureRoutes } from "./router/SecureRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider
      theme={{
        globalStyles: () => ({
          body: {
            fontFamily: "Roboto",
          },
        }),
      }}
    >
      <ModalsProvider>
        <ToastContainer closeButton={true} limit={5} />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <ReduxProvider store={store}>
            <Router>
              <div className="App" style={{ minHeight: "100vh" }}>
                <AuthProvider
                  publicRoutes={<PublicRoutes />}
                  privateRoutes={<SecureRoutes />}
                />
              </div>
            </Router>
          </ReduxProvider>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
