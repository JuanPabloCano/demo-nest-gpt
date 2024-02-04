import OpenAI from 'openai';
import { Options } from './orthography.use-case';

export const prosConsDicusserStreamUseCase = async (openai: OpenAI, { prompt }: Options) => {
  return openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta en español, 
        tu deber es dar una respuesta con los pros y los contras de dicha pregunta,
        
        Debes de responder en formato MARKDOWN, 
        los pros y los contras de la preguntas deberás responderlos en una lista,
        
        Ejemplos de entrada:
        * ¿Puedes comparar entre un carro o una moto?
        * ¿Qué me puede servir más AWS o Google Cloud?
        * ¿Qué es mejor, una PC o una Laptop?
        
        Ejemplo de salida:
        {
          response: string[], // ['pros, contras']
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 400,
  });
};
