import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
console.log('test 123')
export default defineLazyEventHandler(async () => {
  const runTimeConfig = useRuntimeConfig();
  const apiKey = runTimeConfig.openaiApiKey;

  if (!apiKey) throw new Error('Missing OpenAI API key');
  const openai = createOpenAI({
    apiKey: apiKey
  });

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event);
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages,
    });

    return result.toDataStreamResponse();
  });
});