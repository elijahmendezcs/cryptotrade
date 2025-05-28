// src/app/api/strategies/data.ts

import { Strategy } from '@/app/strategies/types';

let strategies: Strategy[] = [
  {
    id: 'sma-crossover',
    name: 'SMA Crossover',
    description: 'Buy when fast SMA crosses above slow SMA.',
    parameters: { fastSma: 50, slowSma: 200, threshold: 1.0 },
    enabled: true,
  },
  {
    id: 'rsi',
    name: 'RSI',
    description: 'Mean-reversion based on RSI levels.',
    parameters: { period: 14, overbought: 70 },
    enabled: false,
  },
];

export function listStrategies() {
  return strategies;
}

export function createStrategy(s: Omit<Strategy, 'id' | 'enabled'>): string {
  const id = s.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  strategies.push({ ...s, id, enabled: true });
  return id;
}

export function setStrategyEnabled(id: string, enabled: boolean) {
  strategies = strategies.map((st) =>
    st.id === id ? { ...st, enabled } : st
  );
}
