'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { Strategy } from '../types';

interface StrategyCardProps {
  strategy: Strategy;
  onToggle: (id: string, enabled: boolean) => void;
}

export default function StrategyCard({
  strategy,
  onToggle,
}: StrategyCardProps) {
  const router = useRouter();

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      {/* Clicking anywhere on the content navigates to the detail page */}
      <CardContent onClick={() => router.push(`/strategies/${strategy.id}`)}>
        <CardTitle>{strategy.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4">
          {strategy.description}
        </p>

        {/* Parameter summary */}
        <div className="space-y-1 mb-4">
          {Object.entries(strategy.parameters).map(([key, val]) => (
            <p key={key} className="text-sm">
              <span className="font-medium">
                {key
                  .replace(/([A-Z])/g, ' $1')    /* FastSma → Fast Sma */
                  .replace(/\b\w/g, (l) => l.toUpperCase()) /* capitalize */}
                :
              </span>{' '}
              {val}
            </p>
          ))}
        </div>
      </CardContent>

      {/* Toggle at the bottom */}
      <CardFooter className="justify-end">
        <Switch
          checked={strategy.enabled}
          onCheckedChange={(checked) => onToggle(strategy.id, checked)}
        />
      </CardFooter>
    </Card>
  );
}
