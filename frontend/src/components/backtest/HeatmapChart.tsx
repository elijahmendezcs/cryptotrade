// frontend/src/components/backtest/HeatmapChart.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import ApexCharts to prevent SSR window errors
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapDataPoint[];
  onCellClick?: (params: { x: number; y: number; value: number }) => void;
}

export default function HeatmapChart({ data, onCellClick }: HeatmapChartProps) {
  const series = [
    {
      name: "P&L",
      data: data.map((point) => ({ x: point.x, y: point.value })),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: { type: "heatmap", toolbar: { show: false } },
    dataLabels: { enabled: false },
    xaxis: { title: { text: "Param X" } },
    yaxis: { title: { text: "Value" } },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { from: -1000, to: 0, color: "#F15B46" },
            { from: 0, to: 1000, color: "#FEB019" },
            { from: 1000, to: 5000, color: "#00E396" },
          ],
        },
      },
    },
    tooltip: { y: { formatter: (val: number) => val.toFixed(2) } },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Heatmap</h3>
      </div>
      <div className="card-content">
        <Chart
          options={options}
          series={series}
          type="heatmap"
          height={300}
          onClick={(
            _event: any,
            _chartContext: any,
            config: any
          ) => {
            const idx = config.dataPointIndex;
            const pt = data[idx];
            onCellClick?.({ x: pt.x, y: pt.y, value: pt.value });
          }}
        />
      </div>
    </div>
  );
}
