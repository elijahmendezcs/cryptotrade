// frontend/src/components/backtest/StrategySelect.tsx
"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface StrategySelectProps {
  strategy: string;
  onChange: (strategy: string) => void;
}

// TODO: replace with real strategy list
const strategies = ["RSI", "SMA Crossover", "MACD"];

export default function StrategySelect({
  strategy,
  onChange,
}: StrategySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Strategy</label>
      <Select value={strategy} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select strategy" />
        </SelectTrigger>
        <SelectContent>
          {strategies.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}