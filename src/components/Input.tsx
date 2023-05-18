//THIRD PARTY MODULES
import classcat from "classcat";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"input">;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="text"
      className={classcat([
        "w-full rounded-lg border border-gray-500 px-4 py-3 text-16 font-semibold",
        className,
      ])}
      {...props}
    />
  );
});

export default Input;
