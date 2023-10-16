import { AxiosInstance } from "axios";

export default class Base {
  protected request: AxiosInstance;
  protected host = "/api";
  protected entities = {
    user: "/users",
    auth: "/auth",
    points: "/points",
    regions: "/regions",
    routes: "/routes",
    buses: "/buses",
    orders: "/orders",
    comforts: "/comforts",
  };

  constructor(request: AxiosInstance) {
    this.request = request;
  }
}
