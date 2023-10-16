import { Region } from "./regions";

export interface Point {
  id: number;
  regionId: number;
  name: string;
  region: Region;
}
