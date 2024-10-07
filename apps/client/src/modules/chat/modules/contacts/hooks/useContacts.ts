import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../services/contacts";
import { useUserStore } from "@/modules/shared/store/user";

export const useContacts = () => {
  const { id } = useUserStore((state) => state);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(id),
    refetchOnWindowFocus: false,
  });

  return { contacts, isLoading };
};
