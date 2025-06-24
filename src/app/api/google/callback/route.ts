// /app/api/google/callback/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
  );

  const { tokens } = await oauth2Client.getToken(code!);

  // Ideally store in database/session
  // For now, redirect to dashboard with tokens in URL
  const redirectUrl = new URL('/dashboard', req.nextUrl.origin);
  redirectUrl.searchParams.set('access_token', tokens.access_token!);

  return NextResponse.redirect(redirectUrl);
}
