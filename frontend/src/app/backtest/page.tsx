// frontend/src/app/backtest/page.tsx
"use client";

import { useState } from "react";
import BacktestControls from "@/components/backtest/BacktestControls";
import BacktestResults from "@/components/backtest/BacktestResults";
import BacktestSummary from "@/components/backtest/BacktestSummary";
import type { HeatmapDataPoint } from "@/components/backtest/HeatmapChart";
import type { EquityPoint } from "@/components/backtest/EquityCurveChart";

// Define interface matching your API response
interface BacktestResultsData {
  heatmap: HeatmapDataPoint[];
  equityCurve: EquityPoint[];
  totalPnl: number;
  winRate: number;
  maxDrawdown: number;
}

// MOCK DATA: remove or replace when backend API is available
const MOCK_RESULTS: BacktestResultsData = {
  heatmap: [
    { x: 10, y: 14, value: -500 },
    { x: 11, y: 14, value: -200 },
    { x: 12, y: 14, value: 100 },
    { x: 13, y: 14, value: 450 },
    { x: 14, y: 14, value: 800 },
    { x: 15, y: 14, value: 1200 },
    { x: 16, y: 14, value: 900 },
    { x: 17, y: 14, value: 300 },
    { x: 18, y: 14, value: -100 },
  ],
  equityCurve: [
    { timestamp: "2025-05-01", value: 10000 },
    { timestamp: "2025-05-07", value: 10300 },
    { timestamp: "2025-05-14", value: 9800 },
    { timestamp: "2025-05-21", value: 11000 },
    { timestamp: "2025-05-28", value: 11500 },
  ],
  totalPnl: 1500,
  winRate: 0.56,
  maxDrawdown: -700,
};

export default function BacktestPage() {
  // State
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(),
  });
  const [strategy, setStrategy] = useState<string>("RSI");
  const [params, setParams] = useState<Record<string, number>>({
    period: 14,
    overbought: 70,
  });
  // Initialize with mock data until API is ready
  const [results, setResults] = useState<BacktestResultsData | null>(MOCK_RESULTS);
  const [loading, setLoading] = useState<boolean>(false);

  // Handler to run backtest (will override mock when API is ready)
  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateRange, strategy, params }),
      });
      const data: BacktestResultsData = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Backtest error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (cellParams: Record<string, number>) => {
    setParams(cellParams);
    handleRun();
  };

  const handleExportCsv = () => {
    // TODO: implement CSV export when ready
    console.log("Export CSV:", results);
  };

  return (
    <main className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-3xl font-semibold">Backtest</h1>

      {/* Controls panel */}
      <BacktestControls
        dateRange={dateRange}
        onDateChange={setDateRange}
        strategy={strategy}
        onStrategyChange={setStrategy}
        params={params}
        onParamsChange={setParams}
        onRun={handleRun}
        loading={loading}
      />

      {/* Always show charts + summary (using mock until API ready) */}
      {results && (
        <>
          <BacktestResults
            results={results}
            onCellClick={handleCellClick}
          />
          <BacktestSummary
            totalPnl={results.totalPnl}
            winRate={results.winRate}
            maxDrawdown={results.maxDrawdown}
            onExportCsv={handleExportCsv}
          />
        </>
      )}
    </main>
  );
}
