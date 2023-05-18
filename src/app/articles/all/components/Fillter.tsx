"use client";
//THIRD PARTY MODULES
import { useSearchParams } from "next/navigation";
//LAYOUT, COMPONENTS
import Select from "_@/components/Select";
import { constant } from "_@/app/articles/all/components/constans";
//HOOK
import useChangeQueryParams from "_@/hooks/useChangeQueryParams";

const Filter = () => {
  const changeParams = useChangeQueryParams();
  const params = useSearchParams();
  const status = params?.get("status");

  return (
    <Select
      defaultValue={status || "ALL"}
      placeholder="Article Status"
      onValueChange={(value) => {
        if (value === "ALL") {
          changeParams({
            status: undefined,
          });
        } else {
          changeParams({
            status: value,
          });
        }
      }}
      data={["ALL", ...constant].map((val) => {
        return {
          id: val,
          name: val,
          value: val,
        };
      })}
    />
  );
};

export default Filter;
