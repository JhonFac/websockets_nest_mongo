import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { TodoService } from '../todo/todo.service';
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
  providers: [WebsocketGateway, TodoService],
})
export class GatewayModule {}
