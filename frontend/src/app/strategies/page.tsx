'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StrategyCard from './components/StrategyCard';
import type { Strategy } from './types';

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  // Fetch your strategies from the API
  useEffect(() => {
    async function fetchStrategies() {
      try {
        const res = await fetch('/api/strategies');
        if (res.ok) {
          const data: Strategy[] = await res.json();
          setStrategies(data);
        }
      } catch (err) {
        console.error('Failed to load strategies', err);
      }
    }
    fetchStrategies();
  }, []);

  // Toggle enable/disable
  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/strategies/${id}/${enabled ? 'enable' : 'disable'}`, {
        method: 'POST',
      });
      setStrategies((prev) =>
        prev.map((s) => (s.id === id ? { ...s, enabled } : s))
      );
    } catch (err) {
      console.error('Failed to toggle strategy', err);
    }
  };

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Strategies</h1>
        <Link href="/strategies/new">
          <Button>Add New Strategy</Button>
        </Link>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </main>
  );
}
