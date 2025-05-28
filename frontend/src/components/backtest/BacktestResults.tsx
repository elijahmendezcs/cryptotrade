// frontend/src/components/backtest/BacktestResults.tsx
"use client";

import React from "react";
import HeatmapChart, { HeatmapDataPoint } from "./HeatmapChart";
import EquityCurveChart, { EquityPoint } from "./EquityCurveChart";

interface BacktestResultsProps {
  results: {
    heatmap: HeatmapDataPoint[];
    equityCurve: EquityPoint[];
    totalPnl: number;
    winRate: number;
    maxDrawdown: number;
  };
  onCellClick?: (params: { x: number; y: number; value: number }) => void;
}

export default function BacktestResults({ results, onCellClick }: BacktestResultsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HeatmapChart data={results.heatmap} onCellClick={onCellClick} />
      <EquityCurveChart data={results.equityCurve} />
    </div>
  );
}