"use client";
//THIRD PARTY MODULES
import React from "react";
import classcat from "classcat";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogRadix from "@radix-ui/react-dialog";

type DialogProps = DialogRadix.DialogProps & {
  Content: React.ReactNode;
};

const DialogBase = ({ Content, children, ...props }: DialogProps) => (
  <DialogRadix.Root {...props}>
    <DialogRadix.Trigger asChild>{children}</DialogRadix.Trigger>
    <DialogRadix.Portal>
      <DialogRadix.Overlay className="fixed inset-0 bg-gray-900/50 backdrop-blur-[1px] data-[state=open]:animate-overlayShow" />
      <DialogRadix.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        {Content}

        <DialogRadix.Close asChild>
          <button
            className="absolute right-3 top-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-teal-900 hover:bg-red-100 focus:shadow-sm focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </DialogRadix.Close>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  </DialogRadix.Root>
);

export default DialogBase;
export const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogRadix.Title>) => (
  <DialogRadix.Title
    className={classcat(["text-20 font-semibold text-teal-900", className])}
    {...props}
  />
);
export const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogRadix.Description>) => (
  <DialogRadix.Description
    className={classcat(["text-13lig mt-1 text-gray-700", className])}
    {...props}
  />
);
