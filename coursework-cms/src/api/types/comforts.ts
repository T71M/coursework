export interface Comfort {
  id: number;
  name: string;
}

export interface BusComfort {
  busId: number;
  comfortId: number;
  comfort: Comfort;
}
