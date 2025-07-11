import { getMenuService } from "@/services/api/menuService";
import { useQuery } from "@tanstack/react-query";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu", "get"],
    queryFn: getMenuService,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
