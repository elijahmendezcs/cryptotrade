// src/app/api/strategies/[strategyId]/disable/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setStrategyEnabled } from '../../data';

export async function POST(
  req: NextRequest,
  { params }: { params: { strategyId: string } }
) {
  setStrategyEnabled(params.strategyId, false);
  return NextResponse.json({ success: true });
}
