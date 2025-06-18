import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:10001', 'localhost:10002', 'localhost:10003'],
        },
        consumer: {
          groupId: 'consumer-group-1', // consumer group id 반드시 필요
        },
      },
    },
  );
  await app.listen();
  console.log('Consumer service is listening');
}
bootstrap();
