"use client";
//THIRD PARTY MODULES
import { useState } from "react";
import { formatTitle } from "_@/utils/formatTitle";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
//LAYOUT, COMPONENTS
import BrowserOnly from "_@/components/BrowserOnly";
import Switch from "_@/components/conditions/Switch";

export const SortHeader = ({
  title,
  name,
}: {
  title: string;
  name: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);

  const onSort = (sort: "asc" | "desc" | undefined) => {
    const status = {
      asc: "desc",
      desc: undefined,
    };
    const newStatus = !sort
      ? "asc"
      : (status[sort] as "asc" | "desc" | undefined);

    setSort(newStatus);

    //update query params

    const key = "sort";
    const prefix = ",";
    const query = new URLSearchParams(searchParams?.toString());

    const sorts = query.getAll(key).map((item) => {
      return decodeURIComponent(item).split(prefix);
    });

    const index = sorts.findIndex((item) => item[0] === formatTitle(name));

    if (index !== -1) {
      //remove sort if value is undefined
      if (!newStatus) {
        sorts.splice(index, 1);
      } else {
        //@ts-ignore
        sorts[index][1] = newStatus;
      }
    } else {
      if (!newStatus) return;
      sorts.push([formatTitle(name), newStatus]);
    }

    query.delete(key);
    sorts.forEach((item) => {
      query.append(key, `${item[0]}${prefix}${item[1]}`);
    });

    const url = `${pathname}?${query.toString()}`;
    router.replace(url, undefined);
  };

  return (
    <BrowserOnly>
      <button className="flex items-center gap-1" onClick={() => onSort(sort)}>
        <span>{title}</span>
        <Switch.Root>
          <Switch.Case when={sort === "asc"}>
            <ChevronDownIcon className="h-4 w-4" />
          </Switch.Case>
          <Switch.Case when={sort === "desc"}>
            <ChevronDownIcon className="h-4 w-4 rotate-180 transform" />
          </Switch.Case>
        </Switch.Root>
      </button>
    </BrowserOnly>
  );
};
