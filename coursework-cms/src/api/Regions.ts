import queryString from "query-string";
import Base from "./Base";
import { PaginationParams } from "./types/api";
import { CreateRegionForm, Region } from "./types/regions";
import { Point } from "./types/point";

export default class Regions extends Base {
  async readAll({ perPage, page }: PaginationParams) {
    const query = queryString.stringify(
      { perPage, page },
      { skipEmptyString: true, skipNull: true }
    );
    const res = await this.request.get<Region[]>(
      `${this.host}${this.entities.regions}?${query}`
    );

    return res.data;
  }
  async create(data: CreateRegionForm) {
    const res = await this.request.post<Region>(
      `${this.host}${this.entities.regions}`,
      data
    );

    return res.data;
  }
  async delete(id: number) {
    const res = await this.request.delete(
      `${this.host}${this.entities.regions}/${id}`
    );

    return res.data;
  }

  async readOne(id?: number) {
    if (!id) return;

    const res = await this.request.get<Region>(
      `${this.host}${this.entities.regions}/${id}`
    );

    return res.data;
  }

  async update({ id, name }: Region) {
    const res = await this.request.patch(
      `${this.host}${this.entities.regions}/${id}`,
      {
        name,
      }
    );

    return res.data;
  }

  async getRegionCities(
    { perPage, page }: PaginationParams,
    regionId?: number
  ) {
    if (!regionId) return;
    const query = queryString.stringify(
      { perPage, page },
      { skipEmptyString: true, skipNull: true }
    );

    const res = await this.request.get<Point[]>(
      `${this.host}${this.entities.regions}/${regionId}/points?${query}`
    );

    return res.data;
  }
}
