import { Point } from "../types/point";
import Base from "./Base";

export default class Points extends Base {
  async readAll() {
    const res = await this.request.get<Point[]>(
      `${this.host}${this.entities.points}`
    );

    return res.data;
  }
}
