"use client";
//THIRD PARTY MODULES
import React from "react";
import classcat from "classcat";
import { Assign } from "_@/utils/type";
//TYPES MODULES
import type { ComponentPropsWithRef } from "react";

const baseClasses = [
  "w-full rounded-lg border border-gray-500 px-4 py-3 text-16 font-medium bg-transparent text-gray-800",
  "placeholder:text-gray-400 placeholder:font-normal",
];

export type As = "input" | "textarea";
export type BaseInputProps<T extends As> = Assign<
  ComponentPropsWithRef<T>,
  {
    as?: T;
  }
>;

const BaseInputForwardRef = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  BaseInputProps<any>
>(({ className = "", as: Component = "input", ...props }, ref) => {
  return (
    <Component
      ref={ref as any}
      className={classcat([baseClasses, className])}
      {...props}
    />
  );
});

const BaseInput = BaseInputForwardRef as <T extends As = "input">(
  props: { as?: T } & BaseInputProps<T>
) => JSX.Element;

export default BaseInput;
