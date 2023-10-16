import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";

export const useComfortList = () => {
  const { data, ...rest } = useQuery(["COMFORTS_LIST"], () =>
    api.readAllComforts()
  );

  return { comforts: data, ...rest };
};
