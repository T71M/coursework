import { FC } from "react";
import { RouteSearch } from "../home/sections/RouteSearch";
import { FindedRoutes } from "./FindedRoutes";

export const RacesPage: FC = () => {
  return (
    <div className="root">
      <RouteSearch />
      <FindedRoutes />
    </div>
  );
};
