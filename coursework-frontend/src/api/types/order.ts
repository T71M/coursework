import { Route } from "./routes";

export interface Order {
  id: number;
  routeId: number;
  userId: number;
  date: string;
  seat_count: number;
  route: Route;
}
