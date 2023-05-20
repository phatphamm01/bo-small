"use client";
//THIRD PARTY MODULES
//UTILS
import styled from "_@/utils/styled";
import {
  Cell,
  Header,
  HeaderGroup,
  Row,
  flexRender,
  Table as TableInstance,
} from "@tanstack/react-table";
import {
  Children,
  ComponentProps,
  ReactElement,
  ReactNode,
  createContext,
  isValidElement,
  useContext,
} from "react";
//LAYOUT, COMPONENTS
import NoData from "_@/components/NoData";
import ScrollArea from "_@/components/ScrollArea";

type ChildrenType = { children?: ReactElement | ReactElement[] | ReactNode };

type ComponentPropsWithElementChildren<T extends React.FC<any>> = Omit<
  ComponentProps<T>,
  "children"
> &
  ChildrenType;

export type ReactTableProps = {
  children: ReactNode;
  tableInstance: TableInstance<any>;
} & React.ComponentPropsWithoutRef<typeof Wrapper>;

const tableContext = createContext<TableInstance<any>>({} as any);

const Root = ({ children, tableInstance, ...rest }: ReactTableProps) => {
  return (
    <tableContext.Provider value={tableInstance}>
      <Wrapper {...rest}>{children}</Wrapper>
    </tableContext.Provider>
  );
};

function Table({ children, ...props }: ComponentProps<typeof StyledTable>) {
  return (
    <Wrapper>
      <ScrollArea>
        <StyledTable {...props}>{children}</StyledTable>
      </ScrollArea>
    </Wrapper>
  );
}

const headerGroupContext = createContext<HeaderGroup<any>>({} as any);

function Head({ children, ...props }: ComponentProps<typeof StyledTBody>) {
  const tableInstance = useContext(tableContext);
  const element = children || <RowHead />;
  return (
    <StyledTHead {...props}>
      {tableInstance.getHeaderGroups().map((headerGroup, id) => (
        <headerGroupContext.Provider
          value={headerGroup}
          key={headerGroup.id + id}
        >
          {element}
        </headerGroupContext.Provider>
      ))}
    </StyledTHead>
  );
}

const headerContext = createContext<Header<any, unknown>>({} as any);

function RowHead({
  children,
  ...props
}: ComponentProps<typeof StyledTRowHead>) {
  const headerGroup = useContext(headerGroupContext);
  const element = children || <TH />;

  return (
    <StyledTRowHead {...props}>
      {headerGroup.headers.map((header, id) => (
        <headerContext.Provider value={header} key={header.id + id}>
          {element}
        </headerContext.Provider>
      ))}
    </StyledTRowHead>
  );
}

function TH({ children, ...props }: ComponentProps<typeof StyledTH>) {
  const header = useContext(headerContext);
  const element = children || <THCellSlot />;
  const size = header.getSize() === 150 ? undefined : header.getSize();

  return (
    <StyledTH style={{ width: size }} colSpan={header.colSpan} {...props}>
      {element}
    </StyledTH>
  );
}

function THCellSlot() {
  const header = useContext(headerContext);
  return (
    <>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </>
  );
}

const rowContext = createContext<Row<any>>({} as any);

function TBody({ children, ...props }: ComponentProps<typeof StyledTBody>) {
  const tableInstance = useContext(tableContext);
  const element = children || <RowBody />;
  return (
    <StyledTBody {...props}>
      {tableInstance.getRowModel().rows.map((row, id) => (
        <rowContext.Provider value={row} key={row.id + id}>
          {element}
        </rowContext.Provider>
      ))}
    </StyledTBody>
  );
}

const cellContext = createContext<Cell<any, unknown>>({} as any);

function RowBody({
  children,
  ...props
}: ComponentPropsWithElementChildren<typeof StyledTRowBody>) {
  const row = useContext(rowContext);
  let element: ReactElement = <TD />;
  const mapper: Record<string, JSX.Element> = {};
  const childrenArr = Children.toArray(children);

  if (childrenArr.length === 0) {
    element = <TD />;
  } else if (
    childrenArr.length === 1 &&
    isValidElement(childrenArr[0]) &&
    !childrenArr[0]?.props?.["data-column-id"]
  ) {
    element = childrenArr[0];
  } else {
    childrenArr.forEach((child: ReactNode) => {
      if (isValidElement(child) && child.props?.["data-column-id"]) {
        mapper[child.props?.["data-column-id"]] = child;
      }
    });
  }

  return (
    <StyledTRowBody {...props}>
      {row.getVisibleCells().map((cell, id) => (
        <cellContext.Provider value={cell} key={cell.id + id}>
          {mapper[cell.column.id] || element}
        </cellContext.Provider>
      ))}
    </StyledTRowBody>
  );
}

const tdContext = createContext<Cell<any, unknown>>({} as any);

function TD({
  children,
  ...props
}: ComponentPropsWithElementChildren<typeof StyledTD>) {
  const cell = useContext(cellContext);
  const element = children || <TDCellSlot />;
  return (
    <tdContext.Provider value={cell}>
      <StyledTD {...props}>{element}</StyledTD>
    </tdContext.Provider>
  );
}

function TDCellSlot() {
  const cell = useContext(tdContext);

  return <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>;
}

function NoDataWrapper() {
  return <NoData message={`Can't find any matches for this keyword`} />;
}

function ActionsSection({ children }: { children: ChildrenType }) {
  return { children };
}

const Wrapper = styled("div", "relative overflow-x-auto shadow-sm", {
  MsOverflowStyle: "none" /* Hide scrollbar for IE and Edge */,
  scrollbarWidth: "none" /* Hide scrollbar for IE and Edge */,
});
const StyledTable = styled(
  "table",
  "w-full min-w-max bg-white rounded-lg overflow-hidden"
);
const StyledTHead = styled("thead", "border-b border-neutral-300");
const StyledTH = styled(
  "th",
  ({
    canSort,
    isAction,
    isRowSelection,
  }: {
    canSort?: boolean;
    isRowSelection?: boolean;
    isAction?: boolean;
  }) => [
    "py-3.5 pb-[9px] px-6 relative font-semibold text-left text-xs",
    "[&_svg.sort-icon]:w-4 [&_svg.sort-icon]:h-4 [&_svg.sort-icon]:absolute [&_svg.sort-icon]:top-1/2 [&_svg.sort-icon]:right-1 [&_svg.sort-icon]:-translate-y-1/2",
    canSort && "cursor-pointer select-none",
    isAction && "pr-3",
    isRowSelection && "w-10 pl-3 [&>div]:block [&_input]:block",
  ]
);
const StyledTBody = styled("tbody", "", {});
const StyledTRowHead = styled("tr", "", {});
const StyledTRowBody = styled(
  "tr",
  ({ isSelected }: { isSelected?: boolean }) => [
    "hover:bg-gray-50 border-b last:border-b-0",
    isSelected ? "bg-neutral-100" : "bg-white",
  ]
);
const StyledTD = styled(
  "td",
  "py-4 px-6 border-neutral-300 text-sm tracking-10"
);

const defaultObject = {
  Root,
  NoDataWrapper,
  Table,
  ActionsSection,
  Head,
  TH,
  TBody,
  TD,
  RowHead,
  RowBody,
  TDCellSlot,
  THCellSlot,
  headerGroupContext,
  headerContext,
  rowContext,
  cellContext,
  tdContext,
};

export default defaultObject;
