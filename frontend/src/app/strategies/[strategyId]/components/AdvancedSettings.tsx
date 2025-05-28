'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AdvancedSettingsProps {
  livePreview: boolean;
  onLivePreviewChange: (val: boolean) => void;
  autoRun: boolean;
  onAutoRunChange: (val: boolean) => void;
}

export default function AdvancedSettings({
  livePreview,
  onLivePreviewChange,
  autoRun,
  onAutoRunChange,
}: AdvancedSettingsProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/10 rounded-lg border">
      <div className="flex items-center justify-between">
        <Label>Live Preview</Label>
        <Switch checked={livePreview} onCheckedChange={onLivePreviewChange} />
      </div>
      <div className="flex items-center justify-between">
        <Label>Auto-run on Change</Label>
        <Switch checked={autoRun} onCheckedChange={onAutoRunChange} />
      </div>
    </div>
  );
}
