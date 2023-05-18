"use client";
//THIRD PARTY MODULES
import { useRef } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type LegendItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  LineController,
  Tooltip,
  Legend,
  Filler
);
ChartJS.defaults.scales.linear.min = 0;
// THIRD PARTY MODULES

const options: React.ComponentProps<typeof ReactChart>["options"] = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        dash: (ctx) => (ctx.tick.value === 0 ? [0, 0] : [5, 5]),
        color: "#E5E5EF",
        display: false,
      },
      grid: {
        color: "#E5E5EF",
        tickColor: "transparent",
      },
      ticks: {
        stepSize: 20,
      },
    },
  },
};

interface ChartProps {
  data: React.ComponentProps<typeof ReactChart>["data"];
}

type LegendItemWithOnClick = { onClick?: () => void } & LegendItem;
type Legend = Omit<ChartJS["legend"], "legendItems"> & {
  legendItems?: LegendItemWithOnClick[];
};

export default function Chart({ data }: ChartProps) {
  const chartRef = useRef<ChartJS>(null);

  return (
    <div className="relative w-full pt-[calc(227/692*_100%)]">
      <div className="absolute inset-0">
        <ReactChart ref={chartRef} options={options} data={data} type="line" />
      </div>
    </div>
  );
}
