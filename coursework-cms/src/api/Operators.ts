import queryString from "query-string";
import Base from "./Base";
import { ListResponse, PaginationParams } from "./types/api";
import { Point } from "./types/point";
import { User } from "./types/user";

export default class Operators extends Base {
  async readAll({
    perPage,
    page,
    search = "",
  }: PaginationParams & { search: string }) {
    const query = queryString.stringify(
      { perPage, page, search },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<ListResponse<User>>(
      `${this.host}${this.entities.user}/operators?${query}`
    );

    return res.data;
  }

  async readOne(id?: number) {
    if (!id) return;

    const res = await this.request.get<User>(
      `${this.host}${this.entities.user}/${id}`
    );

    return res.data;
  }

  async create(data: Point) {
    const res = await this.request.post<User>(
      `${this.host}${this.entities.user}`,
      data
    );

    return res.data;
  }

  async update({ id, ...rest }: User) {
    const res = await this.request.patch<User>(
      `${this.host}${this.entities.user}/${id}`,
      rest
    );

    return res.data;
  }

  async remove(id: number) {
    const res = await this.request.delete(
      `${this.host}${this.entities.points}/${id}`
    );

    return res.data;
  }
}
