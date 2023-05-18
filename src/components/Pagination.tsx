"use client";
//THIRD PARTY MODULES
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
//LAYOUT, COMPONENTS
import Show from "_@/components/conditions/Show";
//LAYOUT, COMPONENTS

type PaginationType = {
  totalPage: number;
};

const Pagination = (props: PaginationType) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState(
    Number(params?.get("page")) || 1
  );
  const [totalPage, _setTotalPage] = useState(0);

  const handlePageChange = (page: number) => {
    setActivePage(page);

    const query = new URLSearchParams(params?.toString());
    query.set("page", page.toString());
    const url = `${pathname}?${query.toString()}`;
    router.replace(url, undefined);
  };

  const paginationArray = useMemo(() => {
    return handleNavigateArray(activePage, totalPage);
  }, [activePage, totalPage]);

  useEffect(() => {
    _setTotalPage(props.totalPage);
  }, [props.totalPage]);

  return (
    <Show when={totalPage > 1}>
      <div className="flex items-center gap-3 rounded-lg bg-white px-3 shadow-sm">
        <ChevronLeftIcon
          className="h-5 w-5 shrink cursor-pointer select-none"
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
        />
        {paginationArray.map((page, index) =>
          page === "..." ? (
            <span
              className="flex h-8 w-8 items-center justify-center"
              key={`${page}${index}`}
            >
              ...
            </span>
          ) : (
            <button
              key={`${page}${index}`}
              className={`${
                activePage === Number(page)
                  ? "bg-teal-900 text-white"
                  : "bg-white text-gray-800"
              } flex h-8 w-8 items-center justify-center rounded-full`}
              onClick={() => handlePageChange(Number(page))}
            >
              {page}
            </button>
          )
        )}
        <ChevronRightIcon
          className="h-5 w-5 shrink cursor-pointer select-none"
          onClick={() => {
            if (activePage < totalPage) {
              setActivePage(activePage + 1);
            }
          }}
        />
      </div>
    </Show>
  );
};

export default Pagination;

const handleNavigateArray = (
  activePage: number,
  totalPage: number | undefined
) => {
  if (!totalPage) return [];
  const activePageNumber = Number(activePage);
  if (totalPage <= 5) {
    return Array.from({ length: totalPage }, (_, i) => (i + 1).toString());
  } else if (activePageNumber <= 2 || activePageNumber >= totalPage - 1) {
    return [
      "1",
      "2",
      "3",
      "...",
      (totalPage - 2).toString(),
      (totalPage - 1).toString(),
      totalPage.toString(),
    ];
  } else {
    return [
      "1",
      "...",
      (activePageNumber - 1).toString(),
      activePageNumber.toString(),
      (activePageNumber + 1).toString(),
      "...",
      totalPage.toString(),
    ];
  }
};
