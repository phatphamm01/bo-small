//THIRD PARTY MODULES
import classcat from "classcat";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/24/outline";

export type CardProps = {
  title: string;
  value: number;
  percentage: number;
} & React.ComponentPropsWithoutRef<"div">;

const handleFormatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Card({
  title,
  value,
  percentage,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={classcat([
        "space-y-3 rounded-lg border border-gray-200 bg-white px-3 pb-4 pt-3",
        className,
      ])}
      {...props}
    >
      <div>
        <span className="line-clamp-1 text-12 uppercase text-gray-500">
          {title}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-21 font-bold text-gray-900">
          {handleFormatNumber(value)}
        </span>
        <p className="flex items-center space-x-1 text-12">
          {percentage > 0 ? (
            <>
              <span className="shrink-0 text-green-500">+ {percentage} %</span>
              <ArrowSmallUpIcon className="h-5 w-5 shrink-0 text-green-500" />
            </>
          ) : (
            <>
              <span className="shrink-0 text-red-500">
                - {Math.abs(percentage)} %
              </span>
              <ArrowSmallDownIcon className="h-5 w-5 shrink-0 transform text-red-500" />
            </>
          )}
        </p>
      </div>
    </div>
  );
}
