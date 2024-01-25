import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { CodeService } from './websocket.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Todo, TodoSchema } from '../todo/schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  providers: [WebsocketGateway, CodeService],
})
export class GatewayModule {}
