import OpenAI from 'openai';
import { Options } from './create-message.use-case';

interface StatusOptions extends Pick<Options, 'threadId'> {
  runId: string;
}

const waitOneSecond = () => new Promise(resolve => setTimeout(resolve, 1000));

export const checkCompleteStatusUseCase = async (openAI: OpenAI, { runId, threadId }: StatusOptions) => {
  const runStatus = await openAI.beta.threads.runs.retrieve(threadId, runId);
  if (runStatus.status === 'completed') {
    return runStatus;
  }
  console.log({ status: runStatus.status });

  if (runStatus.status === 'failed') {
    throw new Error('An error occur');
  }

  await waitOneSecond();

  return checkCompleteStatusUseCase(openAI, { runId, threadId });
};