import queryString from "query-string";
import Base from "./Base";
import { PaginationParams } from "./types/api";
import { Point } from "./types/point";

export default class Points extends Base {
  async readAll({ perPage, page }: PaginationParams) {
    const query = queryString.stringify(
      { perPage, page },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<Point[]>(
      `${this.host}${this.entities.points}?${query}`
    );

    return res.data;
  }

  async readOne(id?: number) {
    if (!id) return;

    const res = await this.request.get<Point>(
      `${this.host}${this.entities.points}/${id}`
    );

    return res.data;
  }

  async create(data: Point) {
    const res = await this.request.post<Point>(
      `${this.host}${this.entities.points}`,
      data
    );

    return res.data;
  }

  async update({ id, ...rest }: Point) {
    const res = await this.request.patch<Point>(
      `${this.host}${this.entities.points}/${id}`,
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
