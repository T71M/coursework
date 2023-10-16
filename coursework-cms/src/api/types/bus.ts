import { BusComfort } from "./comforts";

export const BusCondition = {
  excellent: "Отличное",
  good: "Хорошее",
  bad: "Плохое",
};

export interface Bus {
  id: number;
  name: string;
  seats_count: number;
  condition: keyof typeof BusCondition;
  comforts: number[] | BusComfort[];
}

export interface BusSeat {
  number: number;
}

export interface BusResponse {
  bus: Bus;
  seats: BusSeat[];
}
