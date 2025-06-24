'use client';

import { useEffect, useState } from 'react';

export default function Dashboard({ searchParams }: { searchParams: { access_token?: string } }) {
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`/api/dashboard-data?access_token=${searchParams.access_token}`);
      const data = await res.json();
      setEvents(data.events);
      setSummary(data.summary);
    };

    if (searchParams.access_token) {
      fetchEvents();
    }
  }, [searchParams.access_token]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Event Summary</h2>
      <p>{summary || 'Loading summary...'}</p>

      <h3 className="mt-8 text-xl font-semibold">Raw Events</h3>
      <ul className="mt-2 list-disc list-inside">
        {events.map((event: any) => (
          <li key={event.id}>
            {event.summary} at {event.start?.dateTime || event.start?.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
