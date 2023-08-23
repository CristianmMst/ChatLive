import { useUserStore } from "@/store/user";
import { getContacts } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useContacts = () => {
  const { id } = useUserStore((state) => state);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(id),
    refetchOnWindowFocus: false,
  });

  return { contacts, isLoading };
};
