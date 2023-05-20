"use client";
//THIRD PARTY MODULES
import Link from "next/link";
import Image from "next/image";
import classcat from "classcat";
import { useState } from "react";
import { ArticleDto } from "_@/swagger/api";
import { ChevronRightIcon } from "@radix-ui/react-icons";
//LAYOUT, COMPONENTS
import Preview from "_@/components/Preview";
import Show from "_@/components/conditions/Show";

// export namespace ArticleDto {
//   /**
//    * @export
//    * @enum {string}
//    */
//   export enum StatusEnum {
//     CREATE = <any>"CREATE",
//     APPROVE = <any>"APPROVE",
//     DENY = <any>"DENY",
//     DELETE = <any>"DELETE",
//     DRAFT = <any>"DRAFT",
//   }
//   /**
//    * @export
//    * @enum {string}
//    */
//   export enum TypeEnum {
//     REVIEWS = <any>"REVIEWS",
//     NEWS = <any>"NEWS",
//   }
// }

// type ArticleDto = {
//   createdBy: string;
//   modifiedBy: string;
//   createdAt: string;
//   updatedAt: string;
//   id: number;
//   title: string;
//   brief: string;
//   shortDescription: string;
//   status: ArticleDto.StatusEnum;
//   mainImage: string;
//   image1: string;
//   description: string;
//   type: ArticleDto.TypeEnum;
//   category: {
//     id?: number | undefined;
//     name?: string | undefined;
//     amountArticle?: number | undefined;
//   };
//   keyword: string;
//   slug: string;
//   thumbnail: string;
//   user: {
//     id?: number | undefined;
//     username?: string | undefined;
//     email?: string | undefined;
//     name?: string | undefined;
//     image?: string | undefined;
//     role?: string | undefined;
//     bio?: string | undefined;
//     followers?: number | undefined;
//     categories?:
//       | {
//           id?: number | undefined;
//           name?: string | undefined;
//           amountArticle?: number | undefined;
//         }[]
//       | undefined;
//     amountArticle?: number | undefined;
//     reason?: string | undefined;
//     _new?: boolean | undefined;
//     contentCreator?: boolean | undefined;
//   };
//   totalLike: number;
//   view: number;
// };

export default function Article({ data }: { data: ArticleDto[] | undefined }) {
  const [id, setId] = useState<string | undefined>(undefined);
  return (
    <div className="article space-y-6 rounded-xl bg-white px-7 py-4">
      <Preview setId={setId} id={id} />
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-500">Article</span>
          <button>
            <Link
              href="/articles/all"
              className="flex items-center space-x-1 text-12 font-semibold text-teal-600"
            >
              See All Article
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </button>
        </div>
        <span className="text-12 font-normal text-gray-500">
          Article is a piece of writing included with others in a newspaper,
        </span>
      </div>
      <div className="grid gap-6">
        {data?.map((item, index) => (
          <div
            className="grid grid-cols-[2fr_5fr_4fr_1fr] items-center gap-6"
            key={index}
          >
            <Tag status={item.status} />
            <div className="flex items-center space-x-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={item.user?.image || "/images/avatar.png"}
                  alt=""
                  fill
                  unoptimized
                />
              </div>

              <div className="flex flex-col">
                <span className="text-12 font-semibold text-gray-900">
                  {item.user?.name}
                </span>
                <span className="text-12 font-normal text-gray-500">
                  {item.user?.email}
                </span>
              </div>
            </div>
            <div className="flex grow flex-col">
              <p>
                <span className="text-12 font-semibold text-gray-900">
                  {item.id}
                </span>
                <Show when={item.title}>
                  <>
                    <span> - </span>
                    <span className="text-12 font-semibold text-gray-900">
                      {item.title}
                    </span>
                  </>
                </Show>
              </p>

              <span className="text-12 font-normal text-gray-500">
                {new Date(item.createdAt || "").toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <button
              onClick={() => setId(String(item.id))}
              className="flex items-center space-x-1 text-gray-900"
            >
              <span className="text-12 font-semibold">View</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const tagColorClasses: Record<ArticleDto.StatusEnum, string> = {
  CREATE: "bg-yellow-100 text-yellow-600",
  APPROVE: "bg-green-100 text-green-600",
  DENY: "bg-red-100 text-red-600",
  DELETE: "bg-red-100 text-red-600",
  DRAFT: "bg-gray-100 text-gray-600",
} as any;

const Tag = ({ status }: { status: ArticleDto.StatusEnum | undefined }) => {
  return (
    <div
      className={classcat([
        "flex w-[100px] items-center justify-center space-x-2 rounded-full py-1",
        status && tagColorClasses[status],
      ])}
    >
      <svg
        className="h-2 w-2 shrink-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
      </svg>
      <span className="text-12 font-medium">{status}</span>
    </div>
  );
};
