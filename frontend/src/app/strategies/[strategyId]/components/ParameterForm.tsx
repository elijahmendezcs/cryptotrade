'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ParameterFormProps {
  values: { fastSma: number; slowSma: number; threshold: number };
  onChange: (values: { fastSma: number; slowSma: number; threshold: number }) => void;
}

export default function ParameterForm({ values, onChange }: ParameterFormProps) {
  const handleChange = (field: keyof typeof values, v: number) => {
    onChange({ ...values, [field]: v });
  };

  return (
    <div className="space-y-6">
      {/* Fast SMA */}
      <div>
        <Label>Fast SMA</Label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={1}
            max={values.slowSma - 1}
            value={values.fastSma}
            onChange={(e) => handleChange('fastSma', Number(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={values.fastSma}
            onChange={(e) => handleChange('fastSma', Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {/* Slow SMA */}
      <div>
        <Label>Slow SMA</Label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={values.fastSma + 1}
            max={500}
            value={values.slowSma}
            onChange={(e) => handleChange('slowSma', Number(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            value={values.slowSma}
            onChange={(e) => handleChange('slowSma', Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {/* Signal Threshold */}
      <div>
        <Label>Signal Threshold</Label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={values.threshold}
            onChange={(e) => handleChange('threshold', Number(e.target.value))}
            className="flex-1"
          />
          <Input
            type="number"
            step={0.1}
            value={values.threshold}
            onChange={(e) => handleChange('threshold', Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}
