import OpenAI from 'openai';
import { Options } from './create-message.use-case';

interface RunInterface extends Pick<Options, 'threadId'> {
  assistantId?: string;
}

export const createRunUseCase = async (openAI: OpenAI, {
  threadId,
  assistantId = 'asst_MnbHMo0YwNQQoRhrYT744Qvh',
}: RunInterface) => {
  const run = await openAI.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions: Sobreescribe el asistente actual, manejar con cuidado
  });

  console.log({ run });
  return run;
};

