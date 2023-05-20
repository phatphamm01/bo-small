"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

const scrollClasses = {
  thumb:
    "relative rounded-md flex-1 bg-teal-800 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
};

type ScrollAreaProps = React.PropsWithChildren<{
  owStyle?: {
    viewPortClasses?: string;
  };
}> &
  ScrollAreaRadix.ScrollAreaProps;

export default function ScrollArea({
  owStyle,
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaRadix.Root
      type="hover"
      className={classcat(["overflow-hidden", className])}
      {...props}
    >
      <ScrollAreaRadix.Viewport
        className={classcat(["h-full w-full", owStyle?.viewPortClasses])}
      >
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className="flex w-3 touch-none select-none bg-teal-100 transition-colors duration-[160ms] ease-out"
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb className={classcat([scrollClasses.thumb])} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar
        className="flex h-3 touch-none select-none flex-col bg-teal-100 transition-colors duration-[160ms] ease-out"
        orientation="horizontal"
      >
        <ScrollAreaRadix.Thumb className={classcat([scrollClasses.thumb])} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner className="bg-teal-400" />
    </ScrollAreaRadix.Root>
  );
}
