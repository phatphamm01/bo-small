"use client";
//THIRD PARTY MODULES
import { toast } from "react-toastify";
import { articleApi } from "_@/swagger";
import { ArticleDto } from "_@/swagger/api";
import { useContext, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
//LAYOUT, COMPONENTS
import Pagination from "_@/components/Pagination";
import Table from "_@/components/react-table/Table";
import { SortHeader } from "_@/components/SortHeader";
import T from "_@/components/react-table/CompoundTable";
import Preview from "_@/app/articles/all/components/Preview";
import { constant } from "_@/app/articles/all/components/constans";
import Select, { SelectTrigger, SelectValue } from "_@/components/Select";
//HOOK
import useChangeQueryParams from "_@/hooks/useChangeQueryParams";

const tagColor: Record<string, string> = {
  CREATE: "bg-blue-100 text-blue-800",
  APPROVE: "bg-green-100 text-green-800",
  DELETE: "bg-red-100 text-red-800",
  DRAFT: "bg-yellow-100 text-yellow-800",
  DENY: "bg-red-100 text-red-800",
};

const articleChainHelper = createColumnHelper<ArticleDto>();

const ChangeStatus = ({ row }: any) => {
  const router = useRouter();
  const value = row.getValue();

  return (
    <Select
      key={row.row.original.id}
      defaultValue={row.getValue()?.toString()}
      data={constant.map((val) => ({
        id: val,
        name: val,
        value: val,
      }))}
      onValueChange={(value) => {
        const id = row.row.original.id;
        if (!id) return;
        articleApi.changeStatusArticle(id, value).then((res) => {
          if (res.data) {
            router.refresh();
            toast.success("Thay đổi trạng thái thành công");
          } else {
            toast.error("Thay đổi trạng thái thất bại");
          }
        });
      }}
    >
      <SelectTrigger>
        <div
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            value && tagColor[value]
          }`}
        >
          <SelectValue />
        </div>
      </SelectTrigger>
    </Select>
  );
};

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
  articleChainHelper.accessor("title", {
    header: () => <SortHeader name="title" title="Title" />,
    size: 380,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("brief", {
    header: "Brief",
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
