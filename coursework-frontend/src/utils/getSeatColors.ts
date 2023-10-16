export const getSeatColors = (seats: number, freeSeats: number) => {
  const percent = (freeSeats / seats) * 100;

  if (percent > 50) {
    return "green";
  }

  if (percent > 30) {
    return "orange";
  }

  return "red";
};
