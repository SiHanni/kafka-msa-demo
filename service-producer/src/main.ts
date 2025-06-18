import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:10001', 'localhost:10002', 'localhost:10003'],
      },
      producer: {
        // 필요시 producer 옵션 추가 가능
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Producer service is listening on port 3000');
}
bootstrap();
