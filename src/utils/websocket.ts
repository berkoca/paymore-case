import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import SocketEventName from "../enums/socket-event-name.enum";

class Websocket {
  private io: Server;

  constructor(server: HTTPServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
  }

  public emitBroadcastEvent(eventName: SocketEventName, data: any) {
    this.io.emit(eventName, data);
  }
}

export default Websocket;
