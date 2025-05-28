'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface OHLC {
  x: Date;
  y: [number, number, number, number]; // [open, high, low, close]
}

interface ChartPreviewProps {
  values: { fastSma: number; slowSma: number; threshold: number };
  livePreview: boolean;
}

// Helper: calculate simple moving average for close prices
function calculateSMA(data: OHLC[], period: number): (number | null)[] {
  const closes = data.map((d) => d.y[3]);
  const sma: (number | null)[] = [];
  for (let i = 0; i < closes.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const window = closes.slice(i - period + 1, i + 1);
      const sum = window.reduce((a, b) => a + b, 0);
      sma.push(Number((sum / period).toFixed(2)));
    }
  }
  return sma;
}

export default function ChartPreview({ values, livePreview }: ChartPreviewProps) {
  // Generate dummy OHLC data for the last 20 days
  const ohlcData: OHLC[] = useMemo(() => {
    const today = new Date();
    const data: OHLC[] = [];
    let basePrice = 100;
    for (let i = 19; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const open = basePrice + (Math.random() - 0.5) * 2;
      const close = open + (Math.random() - 0.5) * 4;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      data.push({ x: date, y: [open, high, low, close] });
      basePrice = close;
    }
    return data;
  }, []);

  // Compute raw SMA arrays
  const fastArr = calculateSMA(ohlcData, values.fastSma);
  const slowArr = calculateSMA(ohlcData, values.slowSma);

  // Build series, mapping line series into { x, y } points
  const series = useMemo(
    () => [
      {
        name: 'Candlestick',
        type: 'candlestick' as const,
        data: ohlcData,
      },
      {
        name: `Fast SMA (${values.fastSma})`,
        type: 'line' as const,
        data: ohlcData.map((d, i) => ({ x: d.x, y: fastArr[i] })),
      },
      {
        name: `Slow SMA (${values.slowSma})`,
        type: 'line' as const,
        data: ohlcData.map((d, i) => ({ x: d.x, y: slowArr[i] })),
      },
    ],
    [ohlcData, fastArr, slowArr, values.fastSma, values.slowSma]
  );

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 300,
      toolbar: { show: false },
      animations: { enabled: livePreview },
    },
    xaxis: { type: 'datetime' },
    tooltip: { shared: true, intersect: false },
    plotOptions: {
      candlestick: { colors: { upward: '#00b746', downward: '#ef403c' } },
    },
  };

  return (
    <div className="mt-6">
      <Chart options={options} series={series} type="candlestick" height={300} />
    </div>
  );
}
