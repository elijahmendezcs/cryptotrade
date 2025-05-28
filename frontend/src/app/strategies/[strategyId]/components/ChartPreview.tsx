'use client';

import React from 'react';

interface ChartPreviewProps {
  values: { fastSma: number; slowSma: number; threshold: number };
  livePreview: boolean;
}

export default function ChartPreview({ values, livePreview }: ChartPreviewProps) {
  return (
    <div className="mt-6">
      {/* TODO: Implement mini candlestick chart with SMA overlays */}
      <div className="h-64 bg-muted/10 flex items-center justify-center rounded-lg">
        Chart Preview — Fast: {values.fastSma}, Slow: {values.slowSma}, Thresh: {values.threshold}
      </div>
    </div>
  );
}
