import axios from "axios";
import tokenStorage from "../utils/tokenStorage";
import { LoginData } from "./types/auth";
import { User } from "./types/user";
import { RegisterResponse } from "./types/api";
import Points from "./entities/Points";
import Routes from "./entities/Routes";
import Orders from "./entities/Orders";

class UserService {
  private host = "/api";
  private entitys = {
    user: "/users",
    auth: "/auth",
  };

  public points = new Points(this.request);
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
      `${this.host}${this.entitys.auth}/login`,
      data
    );
  }

  async whoami() {
    const res = await this.request.get<User>(
      `${this.host}${this.entitys.auth}/whoami`
    );

    return res ?? null;
  }

  async signUp(data: User) {
    const res = await this.request.post<RegisterResponse>(
      `${this.host}${this.entitys.auth}/register`,
      data
    );

    return res.data;
  }

  async updateUser({ id, ...rest }: Partial<User>) {
    delete rest.exp;
    delete rest.iat;
    delete (rest as any).role;
    const res = await this.request.patch<User>(
      `${this.host}${this.entitys.user}/${id}`,
      rest
    );
    return res.data;
  }

  async getUser(id?: number) {
    if (!id) return;
    const res = await this.request.get<User>(
      `${this.host}${this.entitys.user}/${id}`
    );
    return res.data;
  }
}

export const api = new UserService();
