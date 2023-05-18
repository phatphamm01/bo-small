//THIRD PARTY MODULES
import classcat from "classcat";
import { ComponentProps, forwardRef } from "react";

export default forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    type?: "screen" | "content";
  }
>(function CenterLayout({ className, type = "content", ...props }, forwardRef) {
  return (
    <div
      ref={forwardRef}
      className={classcat([
        "grid",
        type === "screen" && "grid-cols-[1fr_min(100vw,_var(--max-bound))_1fr]",
        type === "content" && "grid-cols-[1fr_min(100%,_var(--max-bound))_1fr]",
        "[&>*]:col-span-1 [&>*]:col-start-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </div>
  );
});
