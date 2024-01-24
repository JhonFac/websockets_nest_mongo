import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TodoService } from '../todo/todo.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly todoService: TodoService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }

  @SubscribeMessage('mensaje')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    console.log(data);
    const createdTodo = await this.todoService.create(data);
    console.log('guardado');
    console.log(createdTodo);
    // client.broadcast.emit('mensaje', createdTodo);
    // También puedes emitir a todos los clientes, incluido el que envió el mensaje original
    // this.server.emit('mensaje', createdTodo);
  }
}
