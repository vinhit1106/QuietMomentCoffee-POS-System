import { getCategoryService } from "@/services/api/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories", "get"],
    queryFn: getCategoryService,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
