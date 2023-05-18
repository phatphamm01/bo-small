"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import { cloneElement, useId } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
//LAYOUT, COMPONENTS
import Switch from "_@/components/conditions/Switch";
//TYPES MODULES
import type { ComponentPropsWithoutRef } from "react";

const baseLabelClasses = "text-14";

export type FormItemProps = {
  labelProps?: ComponentPropsWithoutRef<"label">;
  required?: boolean;
  optional?: boolean;
  label?: string;
  labelClassName?: string;
  name: string;
  children: JSX.Element;
  description?: React.ReactNode;
  renderLabel?: (props: { label: string; required?: boolean }) => JSX.Element;
} & ComponentPropsWithoutRef<"div">;

export default function BaseFormItem({
  labelClassName = baseLabelClasses,
  required,
  optional,
  labelProps,
  label,
  name,
  children,
  className,
  description,
  renderLabel,
  ...rest
}: FormItemProps) {
  const id = useId();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div
      data-wrapper="1"
      className={classcat(["space-y-2", className])}
      {...rest}
    >
      {label ? (
        <>
          {
            <Switch.Root>
              <Switch.Case when={renderLabel}>
                {renderLabel?.({ label, required })}
              </Switch.Case>
              <Switch.Case when={true}>
                <label
                  className={classcat([
                    "flex items-center text-16 font-semibold text-gray-600",
                    labelClassName,
                  ])}
                  {...labelProps}
                  htmlFor={id}
                >
                  {label}
                  {required ? (
                    <span className=" ms-1 text-red-500">&#42;</span>
                  ) : null}
                  {optional ? (
                    <span className="text-blu-200 ms-1 text-12lig">
                      (optional)
                    </span>
                  ) : null}
                </label>
              </Switch.Case>
            </Switch.Root>
          }
        </>
      ) : null}

      <div className="grid gap-2">
        {cloneElement(children, { id, name, required })}
        {description}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <p id={`err-${id}`} className="text-12 text-red-500">
            {message}
          </p>
        )}
      />
    </div>
  );
}
