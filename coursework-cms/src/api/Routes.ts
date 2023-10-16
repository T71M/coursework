import queryString from "query-string";
import Base from "./Base";
import { ListResponse, PaginationParams } from "./types/api";
import { Route, Weekday } from "./types/routes";

type SearchRouteParams = {
  startPointId?: number | null;
  endPointId?: number | null;
  weekDayStart?: keyof typeof Weekday | null;
  weekDayEnd?: keyof typeof Weekday | null;
  search?: string | null;
};

export default class Routes extends Base {
  async readAll({
    perPage,
    page,
    startPointId,
    endPointId,
    weekDayEnd,
    weekDayStart,
    search,
  }: PaginationParams & SearchRouteParams) {
    const query = queryString.stringify(
      {
        perPage,
        page,
        startPointId,
        endPointId,
        weekDayEnd,
        weekDayStart,
        search,
      },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<ListResponse<Route>>(
      `${this.host}${this.entities.routes}?${query}`
    );

    return res.data;
  }

  async readOne(id?: number) {
    if (!id) return;

    const res = await this.request.get<Route>(
      `${this.host}${this.entities.routes}/${id}`
    );

    return res.data;
  }

  async create(data: Route) {
    const res = await this.request.post<Route>(
      `${this.host}${this.entities.routes}`,
      data
    );

    return res.data;
  }

  async update({ id, ...rest }: Route) {
    const res = await this.request.patch<Route>(
      `${this.host}${this.entities.routes}/${id}`,
      rest
    );

    return res.data;
  }

  async remove(id: number) {
    const res = await this.request.delete(
      `${this.host}${this.entities.routes}/${id}`
    );

    return res.data;
  }
}
