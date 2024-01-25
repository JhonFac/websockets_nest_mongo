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
import { CodeService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly codeService: CodeService) {}

  @WebSocketServer()
  server: Server;

  private connectedClients: Set<Socket> = new Set<Socket>();

  handleConnection(client: Socket) {
    console.log('New client connected', client.id);
    this.connectedClients.add(client);

    // Enviar el ID de la conexión al cliente
    client.emit('getId', client.id);

    this.updateConnectedClientsCount();
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    this.connectedClients.delete(client);
    this.updateConnectedClientsCount();
  }

  private updateConnectedClientsCount() {
    const connectedClientsCount = this.connectedClients.size;
    console.log('Total connected clients:', connectedClientsCount);
    this.server.emit('connectedClientsCount', connectedClientsCount);
  }

  @SubscribeMessage('mensaje')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    console.log(data);
    const result = await this.codeService.findOne(data.title);
    if (!result) {
      await this.codeService.create(data);
      console.log('guardado');
    } else {
      await this.codeService.updateByTitle(data.title, data);
      console.log('actualizado');
    }
    // client.broadcast.emit('mensaje', createdTodo);
    // También puedes emitir a todos los clientes, incluido el que envió el mensaje original
    // this.server.emit('mensaje', createdTodo);
  }
}
