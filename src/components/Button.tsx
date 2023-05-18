//THIRD PARTY MODULES
import classcat from "classcat";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"button"> & React.PropsWithChildren;

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { children, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={classcat([
        "w-full rounded-lg px-3 py-2 font-bold text-white",
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
