import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrthographyDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos/pros-cons-discusser.dto';
import { TranslateDto } from './dtos/translate.dto';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {

  constructor(private readonly gptService: GptService) {
  }


  @Post('orthography-check')
  orthographyCheck(
      @Body() orthographyDto: OrthographyDto,
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(@Body() prosConsDiscusserDto: ProsConsDiscusserDto, @Res() response: Response) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDiscusserDto);
    response.setHeader('Content-Type', 'application/json');
    response.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      response.write(piece);
    }

    response.end();
  }

  @Post('translate')
  translate(
      @Body() translateDto: TranslateDto,
  ) {
    return this.gptService.translate(translateDto);
  }
}