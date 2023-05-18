"use client";
//THIRD PARTY MODULES
import { useState } from "react";
import { toast } from "react-toastify";
import { articleApi } from "_@/swagger";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ArticleDto, CategoryDto } from "_@/swagger/api";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
//LAYOUT, COMPONENTS
import Table from "_@/components/react-table/Table";
import { SortHeader } from "_@/components/SortHeader";
import T from "_@/components/react-table/CompoundTable";
import DialogBase, { Description, Title } from "_@/components/Dialog";

const articleChainHelper = createColumnHelper<CategoryDto>();
const articleColumn = [
  articleChainHelper.accessor("id", {
    header: "ID",
    size: 100,
    cell: (row) => <span>{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("name", {
    header: () => <SortHeader title="Name" name="name" />,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("amountArticle", {
    header: () => <SortHeader title="Total Article" name="amountArticle" />,
    cell: (row) => <span>{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("id", {
    header: "Action",
    size: 100,
    cell: (row) => <Remove id={row.getValue()} />,
  }),
];

type TableProps = {
  data: ArticleDto[] | undefined;
};

export default function TableComponent({ data }: TableProps) {
  const typeTable = useReactTable<CategoryDto>({
    data: data || [],
    columns: articleColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table className="mt-4" tableInstance={typeTable}>
        <T.Head />
        <T.TBody />
      </Table>
    </>
  );
}

const Remove = ({ id }: { id: number | undefined }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onRemove = () => {
    if (!id) return;
    articleApi.removeCategory(id).then((res) => {
      if (res.success) {
        setOpen(false);
        router.refresh();
        toast.success("Xoá thành công");
      } else {
        toast.error("Xoá thất bại");
      }
    });
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={setOpen}
      Content={
        <>
          <Title>Xoá category</Title>
          <Description>Bạn có chắc chắn muốn xoá category này?</Description>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-700"
            >
              Huỷ
            </button>
            <button
              onClick={onRemove}
              className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white"
            >
              Xoá
            </button>
          </div>
        </>
      }
    >
      <button className="text-red-500 hover:text-red-700">
        <TrashIcon className="h-5 w-5" />
      </button>
    </DialogBase>
  );
};
