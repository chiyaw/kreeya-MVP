// /app/api/dashboard-data/route.ts
import { getGoogleCalendarEvents } from '@/lib/getGoogleEvents';
import { summarizeEvents } from '@/lib/summarizeEvents';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('access_token');
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 400 });

  const events = await getGoogleCalendarEvents(token);
  const summary = await summarizeEvents(events);

  return NextResponse.json({ events, summary });
}
