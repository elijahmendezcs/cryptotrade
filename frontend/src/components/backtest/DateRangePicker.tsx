// frontend/src/components/backtest/DateRangePicker.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface DateRangePickerProps {
  dateRange: { from: Date; to: Date };
  onChange: (dateRange: { from: Date; to: Date }) => void;
}

export default function DateRangePicker({
  dateRange,
  onChange,
}: DateRangePickerProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...dateRange, from: new Date(e.target.value) });
  };
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...dateRange, to: new Date(e.target.value) });
  };
  return (
    <div className="flex items-center space-x-2">
      <label className="block">
        <span className="text-sm font-medium">Start</span>
        <Input
          type="date"
          value={dateRange.from.toISOString().split("T")[0]}
          onChange={handleFromChange}
        />
      </label>
      <span>→</span>
      <label className="block">
        <span className="text-sm font-medium">End</span>
        <Input
          type="date"
          value={dateRange.to.toISOString().split("T")[0]}
          onChange={handleToChange}
        />
      </label>
    </div>
  );
}