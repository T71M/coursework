import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/login/LoginPage";

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/login"} />}></Route>
      <Route path="login" element={<LoginPage />}></Route>
    </Routes>
  );
};
