//THIRD PARTY MODULES
import Link from "next/link";
import Image from "next/image";
import classcat from "classcat";
import { ChevronRightIcon } from "@radix-ui/react-icons";

enum ArticleStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

interface ArticleData {
  author: string;
  city: string;
  title: string;
  date: string;
  status: ArticleStatus;
}

const articlesData: ArticleData[] = [
  {
    author: "Pham Van B",
    city: "Ho Chi Minh City",
    title: "Đây là tiêu đề bài viết",
    date: "Jan 17, 2022",
    status: ArticleStatus.PENDING,
  },
  {
    author: "Pham Van B",
    city: "Ho Chi Minh City",
    title: "Đây là tiêu đề bài viết",
    date: "Jan 17, 2022",
    status: ArticleStatus.COMPLETED,
  },
  {
    author: "Pham Van B",
    city: "Ho Chi Minh City",
    title: "Đây là tiêu đề bài viết",
    date: "Jan 17, 2022",
    status: ArticleStatus.CANCELED,
  },
  {
    author: "Pham Van B",
    city: "Ho Chi Minh City",
    title: "Đây là tiêu đề bài viết",
    date: "Jan 17, 2022",
    status: ArticleStatus.COMPLETED,
  },
];

export default function Article() {
  return (
    <div className="article space-y-6 rounded-xl bg-white px-7 py-4">
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
        {articlesData.map((item, index) => (
          <div
            className="grid grid-cols-[2fr_5fr_4fr_1fr] items-center gap-6"
            key={index}
          >
            <Tag status={item.status} />
            <div className="flex items-center space-x-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src="/images/avatar.png" alt="" fill />
              </div>

              <div className="flex flex-col">
                <span className="text-12 font-semibold text-gray-900">
                  {item.author}
                </span>
                <span className="text-12 font-normal text-gray-500">
                  {item.city}
                </span>
              </div>
            </div>
            <div className="flex grow flex-col">
              <span className="text-12 font-semibold text-gray-900">
                {item.title}
              </span>
              <span className="text-12 font-normal text-gray-500">
                {item.date}
              </span>
            </div>
            <button className="flex items-center space-x-1 text-gray-900">
              <span className="text-12 font-semibold">View</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const tagColorClasses: Record<ArticleStatus, string> = {
  Canceled: "bg-red-100 text-red-700",
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const Tag = ({ status }: { status: ArticleStatus }) => {
  return (
    <div
      className={classcat([
        "flex w-[100px] items-center justify-center space-x-2 rounded-full py-1",
        tagColorClasses[status],
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
