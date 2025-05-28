// frontend/src/components/backtest/BacktestSummary.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface BacktestSummaryProps {
  totalPnl: number;
  winRate: number;
  maxDrawdown: number;
  onExportCsv: () => void;
}

export default function BacktestSummary({
  totalPnl,
  winRate,
  maxDrawdown,
  onExportCsv,
}: BacktestSummaryProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start space-y-4 md:space-y-0">
      <div className="space-y-1">
        <p className="text-lg text-muted-foreground">Total P&L</p>
        <p className="text-2xl font-semibold">{totalPnl.toFixed(2)}</p>
      </div>
      <div className="space-y-1">
        <p className="text-lg text-muted-foreground">Win Rate</p>
        <p className="text-2xl font-semibold">{(winRate * 100).toFixed(2)}%</p>
      </div>
      <div className="space-y-1">
        <p className="text-lg text-muted-foreground">Max Drawdown</p>
        <p className="text-2xl font-semibold">{maxDrawdown.toFixed(2)}</p>
      </div>
      <Button variant="link" onClick={onExportCsv} className="self-center">
        Export CSV
      </Button>
    </div>
  );
}