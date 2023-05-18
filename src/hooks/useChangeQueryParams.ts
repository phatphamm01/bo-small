//THIRD PARTY MODULES
import { objectKeys } from "_@/utils/objectKeys";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useChangeQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams?.toString());

  const func = (values: Record<string, string | number | undefined>) => {
    objectKeys(values).forEach((key) => {
      const value = values[key];
      if (value) {
        newSearchParams.set(key, value.toString());
      } else {
        newSearchParams.delete(key);
      }
    });
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return func;
};

export default useChangeQueryParams;
