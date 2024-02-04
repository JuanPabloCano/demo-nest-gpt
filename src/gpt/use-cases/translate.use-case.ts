import OpenAI from 'openai';
import { Options } from './orthography.use-case';

interface TranslateOptions extends Options {
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, { prompt, lang }: TranslateOptions) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Traduce el siguiente texto: ${prompt} al idioma ${lang}
        `,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.2,
  });
  return { output: completion.choices[0].message.content }
};