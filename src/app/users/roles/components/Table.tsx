"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import { useContext } from "react";
import { userApi } from "_@/swagger";
import { toast } from "react-toastify";
import { UserDto } from "_@/swagger/api";
import { useRouter } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
//LAYOUT, COMPONENTS
import Table from "_@/components/react-table/Table";
import { SortHeader } from "_@/components/SortHeader";
import T from "_@/components/react-table/CompoundTable";

const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const articleChainHelper = createColumnHelper<UserDto>();
const articleColumn = [
  articleChainHelper.accessor("id", {
    header: "ID",
    size: 40,
    cell: (row) => <span>{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("image", {
    header: () => <p className="text-center">Image</p>,
    size: 120,
    cell: (row) => (
      <img
        src={row.getValue() || "/images/avatar.png"}
        alt="Main Image"
        className="mx-auto h-10 w-10 rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/images/avatar.png";
        }}
      />
    ),
  }),
  articleChainHelper.accessor("name", {
    header: () => <SortHeader name="name" title="Name" />,
    size: 180,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("email", {
    header: "Email",
    size: 200,
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("reason", {
    header: "Reason",
    cell: (row) => {
      const value = row.getValue();

      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <p className="line-clamp-1 w-fit max-w-[350px]">{value}</p>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 max-w-[440px] select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                sideOffset={5}
              >
                {value}
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    },
  }),
  articleChainHelper.accessor("role", {
    header: () => <p className="text-center">Role</p>,
    cell: (row) => {
      const role = row.getValue();
      return (
        <p
          className={classcat([
            "mx-auto line-clamp-1 w-fit rounded-full px-4 py-1",
            role === "ROLE_USER"
              ? "bg-yellow-50 text-yellow-500"
              : "bg-green-50 text-green-500",
          ])}
        >
          {uppercaseFirstLetter(role?.replace("ROLE_", "") || "")}
        </p>
      );
    },
  }),
  articleChainHelper.accessor("id", {
    header: () => <p className="text-center">Status</p>,
    id: "action",
    size: 140,
    cell: (_row) => null,
  }),
];

type TableProps = {
  data: UserDto[] | undefined;
};

export default function TableComponent({ data }: TableProps) {
  const typeTable = useReactTable<UserDto>({
    data: data || [],
    columns: articleColumn,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Table className="mt-4" tableInstance={typeTable}>
        <T.Head />
        <T.TBody>
          <T.RowBody>
            <T.TD data-column-id="action">
              <Action />
            </T.TD>
          </T.RowBody>
        </T.TBody>
      </Table>
      {/* <div className="mt-3 flex justify-between">
        <Button className="flex w-min items-center gap-2 border font-semibold ow:border-gray-500 ow:text-gray-800">
          Filter
          <ChevronDownIcon className="h-5 w-5 shrink-0" />
        </Button>
        <Pagination totalPage={0} />
      </div> */}
    </>
  );
}

const Action = () => {
  const router = useRouter();
  const row = useContext(T.cellContext);

  return (
    <div className="flex justify-center space-x-3">
      <button
        onClick={() => {
          userApi
            .updateContentCreator1(row.row.original.id)
            .then(() => {
              toast.success("Cập nhật thành công");
              router.refresh();
            })
            .catch(() => {
              toast.error("Cập nhật thất bại");
            });
        }}
      >
        <HandThumbUpIcon className="h-5 w-5 text-green-500" />
      </button>
      <button
        onClick={() => {
          userApi
            .denyContentCreator({
              userId: row.row.original.id,
            })
            .then(() => {
              toast.success("Cập nhật thành công");
              router.refresh();
            })
            .catch(() => {
              toast.error("Cập nhật thất bại");
            });
        }}
      >
        <HandThumbDownIcon className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
};
