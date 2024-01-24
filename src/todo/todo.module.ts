import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoService, CodeService } from './todo.service';
import { TodoController, CodeController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  providers: [TodoService, CodeService],
  controllers: [TodoController, CodeController],
})
export class TodoModule {}
