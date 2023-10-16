import axios from "axios";
import tokenStorage from "../utils/tokenStorage";
import { LoginData } from "./types/auth";
import { User } from "./types/user";
import Regions from "./Regions";
import Points from "./Points";
import Operators from "./Operators";
import { ListResponse, PaginationParams, RegisterResponse } from "./types/api";
import Buses from "./Buses";
import Routes from "./Routes";
import queryString from "query-string";
import Orders from "./Orders";
import { Comfort } from "./types/comforts";

export default class AdminService {
  private host = "/api";
  private entitys = {
    user: "/users",
    auth: "/auth",
    comforts: "/comforts",
  };

  public regions = new Regions(this.request);
  public points = new Points(this.request);
  public operators = new Operators(this.request);
  public buses = new Buses(this.request);
  public routes = new Routes(this.request);
  public orders = new Orders(this.request);

  private get request() {
    const instance = axios.create();

    instance.interceptors.request.use((config) => {
      const token = tokenStorage.getToken();
      if (token) {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //     const e = error as AxiosError;
        //     const { response } = error as ApiError;
        //     const url = e.config?.url?.split("/").slice(-1)[0];
        //     if (
        //       url !== "whoami" &&
        //       url !== "signin-admin" &&
        //       error.response.status === 401
        //     ) {
        //       window.location.reload();
        //     }
        //     if (response.data.message) {
        //       response.data.message = parseResponse(response.data.message);
        //     }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  async login(data: LoginData) {
    return await this.request.post(
      `${this.host}${this.entitys.auth}/login-admin`,
      data
    );
  }

  async whoami() {
    return await this.request.get<User>(
      `${this.host}${this.entitys.auth}/whoami`
    );
  }
  async createOperator(data: User) {
    const res = await this.request.post<RegisterResponse>(
      `${this.host}${this.entitys.auth}/register-operator`,
      data
    );

    return res.data;
  }

  async updateUser({ id, ...rest }: User) {
    const res = await this.request.patch<User>(
      `${this.host}${this.entitys.auth}/${id}`,
      rest
    );
    return res.data;
  }

  async readUser(id?: number) {
    if (!id) return;
    const res = await this.request.get(
      `${this.host}${this.entitys.user}/${id}`
    );

    return res.data;
  }

  async deleteUser(id?: number) {
    if (!id) return;
    const res = await this.request.delete(
      `${this.host}${this.entitys.user}/${id}`
    );

    return res.data;
  }

  async readAll({
    page,
    perPage,
    search = "",
  }: PaginationParams & { search: string }) {
    const query = queryString.stringify(
      { page, perPage, search },
      { skipEmptyString: true, skipNull: true }
    );

    const res = await this.request.get<ListResponse<User>>(
      `${this.host}${this.entitys.user}?${query}`
    );

    return res.data;
  }

  async readAllComforts() {
    const res = await this.request.get<Comfort[]>(
      `${this.host}${this.entitys.comforts}`
    );

    return res.data;
  }
}

export const api = new AdminService();
