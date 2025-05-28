'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from './components/Breadcrumbs';
import ParameterForm from './components/ParameterForm';
import ChartPreview from './components/ChartPreview';
import AdvancedSettings from './components/AdvancedSettings';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function formatTitle(id: string) {
  return id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function StrategyDetailPage() {
  const params = useParams();
  const rawId = params.strategyId;
  const strategyId = Array.isArray(rawId) ? rawId[0] : rawId || '';
  const title = formatTitle(strategyId);

  const [values, setValues] = useState({
    fastSma: 50,
    slowSma: 200,
    threshold: 1.0,
  });
  const [dirty, setDirty] = useState(false);
  const [livePreview, setLivePreview] = useState(true);
  const [autoRun, setAutoRun] = useState(false);

  const handleValuesChange = (newValues: typeof values) => {
    setValues(newValues);
    setDirty(true);
    if (autoRun) {
      // TODO: trigger live preview update
    }
  };

  const handleSave = async () => {
    if (!strategyId) return;
    try {
      const res = await fetch(`/api/strategies/${strategyId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setDirty(false);
        // TODO: replace with toast notification
        alert('Changes saved');
      } else {
        alert('Error saving changes');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="p-6">
      <Breadcrumbs />
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ParameterForm values={values} onChange={handleValuesChange} />
          <ChartPreview values={values} livePreview={livePreview} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={!dirty}>
            Save &amp; Apply
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-6 lg:w-1/3">
        <AdvancedSettings
          livePreview={livePreview}
          onLivePreviewChange={setLivePreview}
          autoRun={autoRun}
          onAutoRunChange={setAutoRun}
        />
      </div>
    </div>
  );
}
