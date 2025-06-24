// lib/summarizeEvents.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeEvents(events: any[]) {
  const formatted = events.map(e => `${e.summary} at ${e.start?.dateTime || e.start?.date}`).join('\n');

  const prompt = `Summarize the following calendar events:\n${formatted}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return res.choices[0].message.content;
}
