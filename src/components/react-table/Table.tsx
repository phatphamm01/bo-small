"use client";
//THIRD PARTY MODULES
import { ReactElement } from "react";
//UTILS
import styled from "_@/utils/styled";
//LAYOUT, COMPONENTS
import NoData from "_@/components/NoData";
import T from "_@/components/react-table/CompoundTable";
//TYPES MODULES
import type { Table, TableOptions } from "@tanstack/react-table";

export type TableData<T extends Record<string, any>> = Omit<
  TableOptions<T>,
  "getCoreRowModel"
>;

interface TableProps<T extends Object> {
  disabled?: boolean;
  tableInstance: Table<T>;
  children: [ReactElement, ReactElement];
  className?: string;
}

export default function Table<T extends Object>({
  disabled = false,
  children,
  tableInstance,
  className,
}: TableProps<T>) {
  const rows = tableInstance.getRowModel().rows || [];

  return (
    <T.Root className={className} tableInstance={tableInstance}>
      <T.Table>{children}</T.Table>
      {rows.length === 0 && <NoData />}
      <Overlay disabled={disabled} />
    </T.Root>
  );
}

const Overlay = styled("div", ({ disabled }: { disabled: boolean }) => [
  "inset-0 z-1 absolute bg-black/20",
  disabled ? "block" : "hidden",
]);
