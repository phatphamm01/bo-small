//THIRD PARTY MODULES
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
//LAYOUT, COMPONENTS
import Chart from "_@/app/components/Chart";

const days: {
  label: string;
  value: string;
}[] = [
  {
    label: "12 tháng",
    value: "12month",
  },
  {
    label: "6 tháng",
    value: "6month",
  },
  {
    label: "7 ngày",
    value: "7day",
  },
  {
    label: "1 ngày",
    value: "1day",
  },
];

const labels = [
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
];

const dataChart: React.ComponentProps<typeof Chart>["data"] = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "MAU",
      backgroundColor: "rgb(13 148 136 / 0.2)",
      borderWidth: 2,
      borderColor: "rgb(13 148 136 / 1)",
      pointBorderColor: "white",
      pointBorderWidth: 2,
      fill: "origin",
      tension: 0.6,
      data: [23, 45, 12, 45, 67, 43, 23, 45, 12, 45, 67, 43],
    },
  ],
};

export default function TotalPost() {
  return (
    <div className="total-post rounded-xl bg-white px-7 py-4">
      <div className="relative mb-8 flex items-center justify-between">
        <span className="font-bold text-gray-500">Total Post</span>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center space-x-3 ">
          {days.map((item) => (
            <button
              className="w-16 rounded-lg border border-stone-400 py-0.5 text-11 text-gray-900"
              key={item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-1 rounded-lg border border-stone-400 px-3 py-2 text-11 font-bold text-gray-900">
          <DocumentArrowDownIcon className="h-4 w-4" />
          <span>Export PDF</span>
        </button>
      </div>
      <Chart data={dataChart} />
    </div>
  );
}
