// frontend/src/components/backtest/BacktestControls.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DateRangePicker from "./DateRangePicker";
import StrategySelect from "./StrategySelect";
import ParamSlider from "./ParamSlider";

interface BacktestControlsProps {
  dateRange: { from: Date; to: Date };
  onDateChange: (dateRange: { from: Date; to: Date }) => void;
  strategy: string;
  onStrategyChange: (strategy: string) => void;
  params: Record<string, number>;
  onParamsChange: (params: Record<string, number>) => void;
  onRun: () => void;
  loading: boolean;
}

export default function BacktestControls({
  dateRange,
  onDateChange,
  strategy,
  onStrategyChange,
  params,
  onParamsChange,
  onRun,
  loading,
}: BacktestControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtest Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date & Strategy + Run */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <DateRangePicker dateRange={dateRange} onChange={onDateChange} />
          <StrategySelect strategy={strategy} onChange={onStrategyChange} />
          <Button onClick={onRun} disabled={loading} className="self-start">
            {loading ? "Running..." : "Run Backtest"}
          </Button>
        </div>
        {/* Parameter sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(params).map(([key, value]) => (
            <ParamSlider
              key={key}
              name={key}
              value={value}
              onChange={(val) => onParamsChange({ ...params, [key]: val })}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}