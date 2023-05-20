"use client";
//THIRD PARTY MODULES
import { ArticleDto } from "_@/swagger/api";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
//LAYOUT, COMPONENTS
import Select from "_@/components/Select";
import Preview from "_@/components/Preview";
import Pagination from "_@/components/Pagination";
import Table from "_@/components/react-table/Table";
import { SortHeader } from "_@/components/SortHeader";
import T from "_@/components/react-table/CompoundTable";
import ChangeStatus from "_@/app/articles/all/components/ChangeStatus";
//HOOK
import useChangeQueryParams from "_@/hooks/useChangeQueryParams";

const articleChainHelper = createColumnHelper<ArticleDto>();
const articleColumn = [
  articleChainHelper.accessor("id", {
    header: "ID",
    cell: (row) => <span>{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("mainImage", {
    header: "Main Image",
    cell: (row) => (
      <img
        src={row.getValue() || "/images/avatar.png"}
        alt="Main Image"
        className="h-10 w-10 rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/images/avatar.png";
        }}
      />
    ),
  }),
  articleChainHelper.accessor("createdBy", {
    header: () => <SortHeader name="createdBy" title="Created By" />,
    size: 150,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("title", {
    header: () => <SortHeader name="title" title="Title" />,
    size: 380,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("shortDescription", {
    header: "Short Description",
    size: 380,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("status", {
    header: () => <SortHeader name="status" title={"Status"} />,
    cell: (row) => <ChangeStatus row={row} />,
  }),
  articleChainHelper.accessor("id", {
    header: "Action",
    id: "action",
    cell: (_row) => (
      <button>
        <EyeIcon className="h-5 w-5" />
      </button>
    ),
  }),
];

type TableProps = {
  data: ArticleDto[] | undefined;
  total: number;
};

export default function TableComponent({ data, total }: TableProps) {
  const [id, setId] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const changeParams = useChangeQueryParams();
  const typeTable = useReactTable<ArticleDto>({
    data: data || [],
    columns: articleColumn,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Preview setId={setId} id={id} />
      <Table className="mt-4" tableInstance={typeTable}>
        <T.Head />
        <T.TBody>
          <T.RowBody>
            <T.TD data-column-id="action">
              <Action setId={setId} />
            </T.TD>
          </T.RowBody>
        </T.TBody>
      </Table>
      <div className="mt-3 flex justify-between">
        <Select
          label="Show"
          placeholder="10"
          defaultValue={searchParams?.get("limit") || "10"}
          onValueChange={(value) => {
            changeParams({
              page: "1",
              limit: value,
            });
          }}
          data={[...Array(5)].map((_, _value) => {
            const value = (_value + 1) * 10;

            return {
              id: value.toString(),
              name: value.toString(),
              value: value.toString(),
            };
          })}
        />

        <Pagination totalPage={total} />
      </div>
    </>
  );
}

const Action = ({ setId }: { setId: any }) => {
  const row = useContext(T.cellContext);

  return (
    <button
      onClick={() => {
        setId(row.row.original.id);
      }}
    >
      <EyeIcon className="h-5 w-5" />
    </button>
  );
};
