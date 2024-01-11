import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class InstallGateway {
  @WebSocketServer() server: Server;

  sendProgressUpdate(data: any) {
    this.server.emit('progressUpdate', data);
  }
}
