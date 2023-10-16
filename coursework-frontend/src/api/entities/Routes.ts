import queryString from "query-string";
import Base from "./Base";
import { Route } from "../types/routes";
import { ListResponse } from "../types/api";

export default class Routes extends Base {
  async search(date: string, endPoint: string) {
    const query = queryString.stringify({ date, endPoint });
    const res = await this.request.get<ListResponse<Route>>(
      `${this.host}${this.entities.routes}/search-routes?${query}`
    );

    return res.data;
  }

  async getRandom(date: string) {
    const query = queryString.stringify({ date });
    const res = await this.request.get<Route[]>(
      `${this.host}${this.entities.routes}/random-routes?${query}`
    );

    return res.data;
  }

  async readOne(id?: number, date?: string | null) {
    if (!id || !date) return;
    const query = queryString.stringify(
      { date },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<Route>(
      `${this.host}${this.entities.routes}/${id}?${query}`
    );

    return res?.data;
  }
}
