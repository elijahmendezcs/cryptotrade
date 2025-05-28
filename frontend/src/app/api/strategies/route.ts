// src/app/api/strategies/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { listStrategies, createStrategy } from './data';
import type { Strategy } from '@/app/strategies/types';

export async function GET() {
  const all = listStrategies();
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name: string;
    description: string;
    parameters: Strategy['parameters'];
  };
  const id = createStrategy({
    name: body.name,
    description: body.description,
    parameters: body.parameters,
  });
  return NextResponse.json({ id });
}
