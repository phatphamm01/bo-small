"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import { UserDto } from "_@/swagger/api";
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
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
  }),
  articleChainHelper.accessor("email", {
    header: "Email",
    cell: (row) => <span className="line-clamp-1">{row.getValue()}</span>,
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
  // articleChainHelper.accessor("id", {
  //   header: "Action",
  //   size: 100,
  //   cell: (_row) => (
  //     <Popover.Root>
  //       <Popover.Trigger asChild>
  //         <button className="text-gray-500 hover:text-gray-700">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M4 6h16M4 12h16M4 18h16"
  //             />
  //           </svg>
  //         </button>
  //       </Popover.Trigger>
  //       <Popover.Content>
  //         <div className="flex gap-2 rounded-md bg-white p-3 shadow-md">
  //           <button>
  //             <EyeIcon className="h-5 w-5" />
  //           </button>
  //         </div>
  //       </Popover.Content>
  //     </Popover.Root>
  //   ),
  // }),
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
        <T.TBody />
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
