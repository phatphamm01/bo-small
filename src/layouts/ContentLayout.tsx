"use client";

//THIRD PARTY MODULES
import Link from "next/link";
import { useCallback, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
//LAYOUT, COMPONENTS
import Input from "_@/components/Input";
import CenterLayout from "_@/layouts/CenterLayout";

const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(timeoutRef.current as NodeJS.Timeout);
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default function ContentLayout({
  children,
  rightAction,
  filter,
}: React.PropsWithChildren & {
  rightAction?: React.ReactNode;
  filter?: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pathName = usePathname();
  const breadcrumb = useMemo(() => {
    const arr = [{ name: "Small", href: "/" }];

    const path = pathName?.split("/");

    path?.forEach((item, index) => {
      if (index > 0) {
        arr.push({
          name: item === "" ? "Dashboard" : upperCaseFirstLetter(item),
          href: path.slice(0, index + 1).join("/"),
        });
      }
    });

    return arr;
  }, [pathName]);

  const onSearch = useDebounce((value: string) => {
    const query = new URLSearchParams(searchParams?.toString());
    if (value) {
      query.set("search", value);
    } else {
      query.delete("search");
    }
    const url = `${pathname}?${query.toString()}`;
    router.push(url, undefined);
  }, 500);

  return (
    <>
      <section className="h-min bg-white shadow-sm full-fledge">
        <CenterLayout className="[--max-bound:1288px]">
          <div className="grid items-center gap-y-2 px-8 pb-4 pt-4">
            <p className="text-12 font-medium text-gray-400">
              {breadcrumb.map((item, index) => (
                <Link href={item.href} key={index}>
                  {item.name}
                  {index !== breadcrumb.length - 1 && (
                    <span className="mx-2">/</span>
                  )}
                </Link>
              ))}
            </p>
            <div className="flex items-center justify-between">
              <h1 className="text-28 font-bold">
                {breadcrumb?.[breadcrumb.length - 1]?.name}
              </h1>
              {rightAction}
            </div>
            <div className="flex items-center gap-4">
              <Input
                className="w-full max-w-[323px] ow:py-2"
                placeholder="Tìm kiếm ..."
                onChange={(e) => onSearch(e.target.value)}
              />
              {filter}
            </div>
          </div>
        </CenterLayout>
      </section>
      <section>
        <CenterLayout className="pb-10 [--max-bound:1288px]">
          <div className="px-8">{children}</div>
        </CenterLayout>
      </section>
    </>
  );
}
