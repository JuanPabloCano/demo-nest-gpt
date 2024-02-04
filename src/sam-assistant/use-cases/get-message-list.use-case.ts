import OpenAI from 'openai';
import { Options } from './create-message.use-case';

interface MessageListOptions extends Pick<Options, 'threadId'> {
}

export const getMessageListUseCase = async (openAI: OpenAI, { threadId }: MessageListOptions) => {
  const messageList = await openAI.beta.threads.messages.list(threadId);
  return messageList.data.map(({ role, content }) => ({
    role,
    content: content.map(ct => (ct as any).text.value),
  }));
};