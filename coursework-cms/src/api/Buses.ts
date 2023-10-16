import queryString from "query-string";
import Base from "./Base";
import { PaginationParams } from "./types/api";
import { Bus, BusResponse } from "./types/bus";

export default class Buses extends Base {
  async readAll({ perPage, page }: PaginationParams) {
    const query = queryString.stringify(
      { perPage, page },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<Bus[]>(
      `${this.host}${this.entities.buses}?${query}`
    );

    return res.data;
  }

  async readOne(id?: number) {
    if (!id) return;

    const res = await this.request.get<BusResponse>(
      `${this.host}${this.entities.buses}/${id}`
    );

    return res.data;
  }

  async create(data: Bus) {
    const res = await this.request.post<BusResponse>(
      `${this.host}${this.entities.buses}`,
      data
    );

    return res.data;
  }

  async update({ id, ...rest }: Bus) {
    const res = await this.request.patch<Bus>(
      `${this.host}${this.entities.buses}/${id}`,
      rest
    );

    return res.data;
  }

  async remove(id: number) {
    const res = await this.request.delete(
      `${this.host}${this.entities.buses}/${id}`
    );

    return res.data;
  }

  async addComfort(busId: number, comfortId: number) {
    const res = await this.request.patch<Bus>(
      `${this.host}${this.entities.buses}/${busId}/connect-comfort/${comfortId}`
    );

    return res.data;
  }

  async deleteComfort(busId: number, comfortId: number) {
    const res = await this.request.patch<Bus>(
      `${this.host}${this.entities.buses}/${busId}/disconnect-comfort/${comfortId}`
    );

    return res.data;
  }
}
