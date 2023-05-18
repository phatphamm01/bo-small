"use client";

//THIRD PARTY MODULES
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function Preview({
  id,
  setId,
}: {
  id: string | undefined;
  setId: any;
}) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!id) return;
    //listen to message from iframe
    const handleMessage = (e) => {
      const { name, height } = e.data;
      if (name === "height-event") {
        setHeight(height);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [id]);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          setId(undefined);
          setHeight(0);
        }
      }}
      open={!!id}
    >
      <Dialog.Portal>
        <Dialog.Content className="fixed left-0 top-0 h-screen w-screen overflow-auto bg-white">
          <div
            style={{ height: `${height}px` }}
            className="relative flex h-full w-full px-[--preview-max-padding]"
          >
            <iframe
              className="h-full w-full"
              src={`https://small-next.netlify.app/preview-for-admin/${id}`}
            />
            <Dialog.Close className="fixed right-0 top-0 m-5 rounded-full bg-red-50/30 p-1 backdrop-blur-sm">
              <Cross2Icon className="h-6 w-6 text-red-800" />
            </Dialog.Close>
          </div>
          {!height ? (
            <div className="grid h-full w-full place-items-center">
              <div className="h-20 w-20">
                <img
                  src="/images/loading-icon.svg"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
