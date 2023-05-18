/* eslint-disable */
//THIRD PARTY MODULES
import { forwardRef } from "react";
import classcat, { Class } from "classcat";

type ElementTagNameMap = {
  [K in keyof JSX.IntrinsicElements]: JSX.IntrinsicElements[K] extends React.HTMLAttributes<
    infer E
  >
    ? E
    : never;
};

type ElementType<TagName extends keyof ElementTagNameMap> =
  ElementTagNameMap[TagName];

function styled<
  Type extends keyof JSX.IntrinsicElements,
  T extends Record<string, any> = {},
  Props = React.ComponentProps<Type>
>(
  type: Type,
  classNameProps: ((props: T) => Class) | Class,
  styleVariant: React.CSSProperties | Record<string, string | number> = {}
) {
  const Element = type as any;

  return forwardRef<ElementType<Type>, T & Props>(
    ({ style, className, ...rest }, ref) => (
      <Element
        ref={ref}
        className={classcat([
          typeof classNameProps === "function"
            ? classNameProps(rest as any)
            : classNameProps,
          className,
        ])}
        style={{ ...style, ...styleVariant }}
        {...rest}
      />
    )
  ) as React.FC<T & Props>;
}

export default styled;
