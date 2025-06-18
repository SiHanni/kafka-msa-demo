import { Controller, Get } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    // 주제(토픽) 등록 및 초기화
    ['test-topic'].forEach((topic) =>
      this.clientKafka.subscribeToResponseOf(topic),
    );
    await this.clientKafka.connect();
  }

  @Get()
  async sendMessage() {
    const message = { value: 'Hello Kafka from Producer!' };
    return this.clientKafka.send('test-topic', message);
  }
}
