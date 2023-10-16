import { FC } from "react";
import { RouteSearch } from "./sections/RouteSearch";
import { RandomRoutes } from "./sections/RandomRoutes";

export const HomePage: FC = () => {
  return (
    <div className="root">
      <RouteSearch homepage />
      <RandomRoutes />
    </div>
  );
};
