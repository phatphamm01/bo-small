"use client";
//THIRD PARTY MODULES
import React from "react";
import Link from "next/link";
import Image from "next/image";
import classcat from "classcat";
import LogoIcon from "_@/icons/LogoIcon";
import { Session } from "_@/types/session";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, HomeIcon } from "@radix-ui/react-icons";
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  NewspaperIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
//LAYOUT, COMPONENTS
import Show from "_@/components/conditions/Show";

export default function Side({ className }: { className?: string }) {
  const session = useSession() as unknown as Session["session"];
  const user = session.data?.user;

  return (
    <div className={classcat(["flex h-full flex-col gap-4", className])}>
      <div className="shrink-0">
        <LogoIcon className="h-[calc(34rem/16)] w-min  text-primary" />
      </div>
      <div className="h-px bg-emerald-900"></div>
      <div className="grow overflow-hidden rounded-lg">
        <div className=" h-full overflow-auto">
          <SideDesktop />
        </div>
      </div>

      <div className="flex shrink items-center justify-between rounded-full bg-teal-50/10 px-4 py-3">
        <div className="flex gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Show when={user?.image}>
              <Image
                className="object-cover`"
                src={user?.image}
                alt="avatar"
                unoptimized
                fill
                sizes="100%"
              />
            </Show>
          </div>
          <div>
            <p className="text-14 font-semibold text-white">{user?.name}</p>
            <p className="text-12 font-normal text-white">Admin</p>
          </div>
        </div>
        <button
          onClick={() => {
            console.log(`${window.location.origin}/login`);
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }}
        >
          <ArrowLeftOnRectangleIcon className="h-6 text-stone-400" />
        </button>
      </div>
    </div>
  );
}

const NavLink = ({
  nav,
}: {
  nav:
    | {
        title: string;
        href: string;
        value: string;
        Icon: any;
        children?: undefined;
      }
    | {
        title: string;
        value: string;
        Icon: any;
        children: {
          name: string;
          href: string;
        }[];
        href?: undefined;
      };
}) => {
  const LinkComponent: any = nav.href ? Link : "p";
  return (
    <>
      <LinkComponent
        className="flex flex-1 items-center gap-3 px-3 py-3  text-14 font-semibold text-white"
        href={nav.href}
      >
        <nav.Icon className="h-6 w-6" />
        <span>{nav.title}</span>
      </LinkComponent>
      {nav.children && (
        <ChevronDownIcon
          className=" text-white transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ow:group-data-[state=open]:rotate-[180deg]"
          aria-hidden
        />
      )}
    </>
  );
};

const SideDesktop = ({ rootClassName }: { rootClassName?: string }) => {
  const pathname = usePathname();
  const activatedTab = pathname?.split("/")[1];

  return (
    <Accordion.Root
      type="single"
      defaultValue={activatedTab}
      className={classcat(["space-y-2", rootClassName])}
    >
      {menus.map((nav) => (
        <AccordionItem key={nav.title} className="space-y-2" value={nav.value}>
          <AccordionTrigger
            className={classcat([
              "pr-4",
              (activatedTab === nav.value && pathname !== "/") ||
              (pathname === "/" && nav.value === "/")
                ? "ow:bg-teal-700"
                : "",
            ])}
          >
            <NavLink nav={nav} />
          </AccordionTrigger>

          {nav.children ? (
            <AccordionContent>
              <ul className="pi-4 space-y-2 overflow-hidden rounded-lg bg-teal-600/30">
                {nav.children.map((subNav) => {
                  return (
                    <li key={subNav.href}>
                      <Link
                        href={subNav.href}
                        className={classcat([
                          "pi-0 block pl-11 text-start font-normal ow:py-3 ow:hover:bg-teal-500/20",
                          "text-white",
                          pathname?.includes(subNav.href) &&
                            "ow:bg-teal-500/30",
                        ])}
                      >
                        {subNav.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          ) : null}
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
};

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classcat([className])}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header>
    <Accordion.Trigger
      className={classcat([
        "group flex w-full  items-center justify-between rounded-lg bg-teal-950",
        className,
      ])}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classcat([
      "overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down",
      className,
    ])}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

const menus = [
  {
    title: "Dashboard",
    href: "/",
    value: "/",
    Icon: HomeIcon,
  },
  {
    title: "Articles",
    value: "articles",
    Icon: NewspaperIcon,
    children: [
      { name: "All", href: "/articles/all" },
      { name: "Categories", href: "/articles/categories" },
    ],
  },
  {
    title: "Users",
    value: "users",
    Icon: UserIcon,
    children: [
      { name: "All", href: "/users/all" },
      { name: "Roles", href: "/users/roles" },
    ],
  },
  {
    title: "Setting",
    value: "setting",
    Icon: Cog6ToothIcon,
    children: [
      { name: "General", href: "/setting/general" },
      { name: "Social", href: "/setting/social" },
    ],
  },
];
