import queryString from "query-string";
import { ListResponse, PaginationParams } from "../types/api";
import { Order } from "../types/order";
import Base from "./Base";

export default class Orders extends Base {
  async readAll({
    page,
    perPage,
    userId,
  }: PaginationParams & { userId?: number }) {
    const query = queryString.stringify(
      { page, perPage, userId },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<ListResponse<Order>>(
      `${this.host}${this.entities.orders}?${query}`
    );

    return res.data;
  }

  async create(data: Order) {
    const res = await this.request.post<Order>(
      `${this.host}${this.entities.orders}`,
      data
    );

    return res;
  }

  async remove(id: number) {
    const res = await this.request.delete(
      `${this.host}${this.entities.orders}/${id}`
    );

    return res.data;
  }
}
