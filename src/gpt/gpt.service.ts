import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { OrthographyDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos/pros-cons-discusser.dto';
import { TranslateDto } from './dtos/translate.dto';

import { orthographyCheckUseCase } from './use-cases';
import { prosConsDicusserStreamUseCase } from './use-cases/pros-cons-discusser-stream.use-case';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-discusser.use-case';
import { translateUseCase } from './use-cases/translate.use-case';

@Injectable()
export class GptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  public async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return prosConsDicusserUseCase(this.openai, { prompt });
  }


  public async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  public translate({ prompt, lang }: TranslateDto): any {
    return translateUseCase(this.openai, { prompt, lang });
  }
}