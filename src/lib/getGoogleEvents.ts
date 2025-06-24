// lib/getGoogleEvents.ts
import { google } from 'googleapis';

export async function getGoogleCalendarEvents(token: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });

  const calendar = google.calendar({ version: 'v3', auth });

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return res.data.items || [];
}
