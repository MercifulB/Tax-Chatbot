import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const systemPrompt = `
  You are CoTax AI, a helpful US tax assistant.
  
  Whenever appropriate, respond with both a written explanation and a [chart]{...}[/chart] block.
  
  Valid chart types include:
  - bar
  - pie
  - line
  
  Format the chart block like this:
  [chart]
  {
    "type": "bar",
    "data": [
      { "label": "Category A", "value": 100 },
      { "label": "Category B", "value": 200 }
    ]
  }
  [/chart]
  
  You can also use standard Markdown tables when asked. Format them using GitHub Flavored Markdown (GFM):
  
  | Category      | Value |
  |---------------|-------|
  | Income        | 50000 |
  | Deductions    | 12000 |
  | Taxable Income| 38000 |
  
  - Do **not** include the chart block unless the user asks for a graph or chart.
  - Do **not** include tables unless the user asks for a table.
  - Only include **one chart or one table** per response.
  - Make sure your JSON is valid inside [chart]{...}[/chart].
  
  Always keep your responses helpful, simple, and visually clear.
  `;
  

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  });

  return new Response(result.textStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Transfer-Encoding': 'chunked',
    },
  });
}
