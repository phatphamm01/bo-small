"use client";
//THIRD PARTY MODULES
import React from "react";
import classcat from "classcat";
import * as Label from "@radix-ui/react-label";
import { CheckIcon } from "@radix-ui/react-icons";
import * as CheckboxRadix from "@radix-ui/react-checkbox";

type Props = {
  name: string;
  label?: string;
  className?: string;
  indicatorClassName?: string;
  rootClassName?: string;
};

const Checkbox = ({
  name,
  label,
  className,
  indicatorClassName,
  rootClassName,
}: Props) => (
  <div className="flex items-center gap-2">
    <CheckboxRadix.Root
      className={classcat([
        "flex h-5 w-5 items-center justify-center rounded-sm border border-gray-500",
        rootClassName,
      ])}
      defaultChecked
      id={name}
    >
      <CheckboxRadix.Indicator
        className={classcat(["text-teal-900", indicatorClassName])}
      >
        <CheckIcon className="h-5 w-5" />
      </CheckboxRadix.Indicator>
    </CheckboxRadix.Root>
    {label && (
      <Label.Root
        className={classcat(["text-gray-600", className])}
        htmlFor={name}
      >
        {label}
      </Label.Root>
    )}
  </div>
);

export default Checkbox;
