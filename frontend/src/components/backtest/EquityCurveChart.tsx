// frontend/src/components/backtest/EquityCurveChart.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import ApexCharts to prevent SSR window errors
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface EquityPoint {
  timestamp: string;
  value: number;
}

interface EquityCurveChartProps {
  data: EquityPoint[];
}

export default function EquityCurveChart({ data }: EquityCurveChartProps) {
  const series = [
    {
      name: "Equity",
      data: data.map((pt) => pt.value),
    },
  ];
  const options: ApexCharts.ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth" },
    xaxis: { categories: data.map((pt) => pt.timestamp), title: { text: "Time" } },
    yaxis: { title: { text: "Equity" } },
    tooltip: { y: { formatter: (val: number) => val.toFixed(2) } },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Equity Curve</h3>
      </div>
      <div className="card-content">
        <Chart options={options} series={series} type="line" height={300} />
      </div>
    </div>
  );
}