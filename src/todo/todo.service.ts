import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(todo: CreateTodoDto) {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async update(id: string, todo: UpdateTodoDto) {
    return this.todoModel
      .findByIdAndUpdate(id, todo, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.todoModel.find().exec();
  }

  async findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}

@Injectable()
export class CodeService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(todo: CreateTodoDto) {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async findLatest() {
    return this.todoModel.findOne().sort({ _id: -1 }).exec();
  }

  async update(title: string, todo: UpdateTodoDto) {
    return this.todoModel
      .findOneAndUpdate({ title }, todo, {
        new: true,
      })
      .exec();
  }
  async findOne(title: string) {
    return this.todoModel.findOne({ title }).exec();
  }

  async updateByTitle(title: string, todo: UpdateTodoDto) {
    return this.todoModel
      .findOneAndUpdate({ title }, todo, {
        new: true,
      })
      .exec();
  }
}
