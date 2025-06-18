import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    console.log('Received message:', message.value);
    return { status: 'ok' };
  }
}
