"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import { ComponentProps, forwardRef } from "react";
import * as SelectRadix from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
//LAYOUT, COMPONENTS

const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SelectRadix.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectRadix.Item
      className={classcat([
        "data-[highlighted]:text-violet1 relative flex select-none items-center rounded-sm py-3 pl-5 pr-6 text-14 leading-none text-teal-950 data-[disabled]:pointer-events-none data-[highlighted]:bg-teal-100/50 data-[disabled]:text-gray-500 data-[highlighted]:outline-none",
        className,
      ])}
      {...props}
      ref={forwardedRef}
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className="absolute left-0 inline-flex items-center justify-center">
        <CheckIcon />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  );
});

type DataRequired = {
  id: string;
  name: string;
  value: string;
};

type SelectProps<T extends DataRequired> = ComponentProps<
  typeof SelectRadix.Root
> & {
  data: T[];
  label?: string;
  placeholder?: string;
  children?: React.ReactNode;
  //   defaultValue?: string;
};

const Select = <T extends DataRequired>({
  children,
  ...props
}: SelectProps<T>) => (
  <SelectRadix.Root
    onValueChange={props.onValueChange}
    defaultValue={props.defaultValue}
  >
    {children ? (
      children
    ) : (
      <SelectRadix.Trigger
        className={classcat([
          "rounded bg-white px-4",
          "h-full min-h-[40px] min-w-[80px] text-14 font-semibold leading-none text-teal-950 data-[placeholder]:text-teal-900",
          "inline-flex items-center justify-center gap-[5px] outline-none",
          "border border-gray-500 hover:bg-teal-200/10 focus:shadow-[0_0_0_2px] focus:shadow-black",
        ])}
        aria-label={props.label}
      >
        <SelectRadix.Value placeholder={props.placeholder} />
        <SelectRadix.Icon className="text-teal-950">
          <ChevronDownIcon />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
    )}

    <SelectRadix.Portal>
      <SelectRadix.Content className="overflow-hidden rounded-md bg-white shadow-sm">
        <SelectRadix.ScrollUpButton className="flex cursor-default items-center justify-center bg-white text-teal-950">
          <ChevronUpIcon />
        </SelectRadix.ScrollUpButton>
        <SelectRadix.Viewport className="p-2">
          {props.data.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectRadix.Viewport>
        <SelectRadix.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-teal-950">
          <ChevronDownIcon />
        </SelectRadix.ScrollDownButton>
      </SelectRadix.Content>
    </SelectRadix.Portal>
  </SelectRadix.Root>
);

export default Select;

export const SelectTrigger = SelectRadix.Trigger;
export const SelectValue = SelectRadix.Value;
