"use client";
//THIRD PARTY MODULES
import classcat from "classcat";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const trafficData = [
  {
    source: "Direct",
    value: 14382,
  },
  {
    source: "Referral",
    value: 87974,
  },
  {
    source: "Social Media",
    value: 45211,
  },
  {
    source: "Twitter",
    value: 21893,
  },
];

export default function TrafficSources() {
  return (
    <div className="traffic-sources flex flex-col space-y-4 rounded-xl bg-white px-7 py-6">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-500">Traffic Sources</span>

        <div className="flex space-x-1 text-gray-900">
          <span className="text-12">Last 7 days</span>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex grow flex-col justify-between">
        {trafficData.map((item) => (
          <Percentage
            key={item.source}
            item={item}
            total={trafficData.reduce((acc, item) => acc + item.value, 0)}
          />
        ))}
      </div>
    </div>
  );
}

//tỷ lệ phần trăm
//=> eng: percentage
const Percentage = ({
  item,
  total,
}: {
  item: (typeof trafficData)[number];
  total: number;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const step = Math.ceil(item.value / 100);
    const interval = setInterval(() => {
      setValue((value) => {
        if (value >= item.value) {
          clearInterval(interval);
          return item.value;
        }
        return value + step;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [item.value]);

  //lấy thời gian chạy của effect từ 0 đến value
  const getTimeEffectMs = () => {
    const step = Math.ceil(item.value / 100);
    return Math.ceil((item.value / step) * 20);
  };

  return (
    <div className="space-y-2" key={item.source}>
      <div className="flex items-center justify-between">
        <span className="text-12 text-gray-500">{item.source}</span>
        <span className="text-12 text-gray-900">{value}</span>
      </div>
      <div>
        <div className="h-2 rounded-lg bg-teal-100">
          <div
            style={
              {
                "--width": (item.value / total) * 100 + "%",
                "--time": getTimeEffectMs() + "ms",
              } as any
            }
            className={classcat([
              "h-full animate-increase-width rounded-lg bg-teal-600",
              value ? "w-[--width]" : "",
            ])}
          ></div>
        </div>
      </div>
    </div>
  );
};
