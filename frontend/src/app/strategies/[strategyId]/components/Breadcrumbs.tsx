'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

function capitalizeWords(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function Breadcrumbs() {
  const params = useParams();
  const rawId = params.strategyId;
  const strategyId = Array.isArray(rawId) ? rawId[0] : rawId || '';
  const title = capitalizeWords(strategyId);

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      <Link href="/strategies" className="hover:underline">
        Strategies
      </Link>
      <span className="px-2">›</span>
      <span className="font-semibold">{title}</span>
    </nav>
  );
}
