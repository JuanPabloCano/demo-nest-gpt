import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { UserQuestionDto } from './dtos/user-question.dto';
import { checkCompleteStatusUseCase } from './use-cases/check-complete-status-use.case';
import { createMessageUseCase } from './use-cases/create-message.use-case';
import { createRunUseCase } from './use-cases/create-run.use-case';
import { createThreadUseCase } from './use-cases/create-thread.use-case';
import { getMessageListUseCase } from './use-cases/get-message-list.use-case';

@Injectable()
export class SamAssistantService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createThread() {
    return createThreadUseCase(this.openai);
  }

  async userQuestion(userQuestion: UserQuestionDto) {
    await createMessageUseCase(this.openai, userQuestion);
    const run = await createRunUseCase(this.openai, { threadId: userQuestion.threadId });
    await checkCompleteStatusUseCase(this.openai, { runId: run.id, threadId: userQuestion.threadId });

    return getMessageListUseCase(this.openai, { threadId: userQuestion.threadId });
  }
}
