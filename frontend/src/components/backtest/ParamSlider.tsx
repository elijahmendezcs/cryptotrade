// frontend/src/components/backtest/ParamSlider.tsx
"use client";

import React from "react";

interface ParamSliderProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function ParamSlider({
  name,
  value,
  min = 0,
  max = 100,
  onChange,
}: ParamSliderProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}