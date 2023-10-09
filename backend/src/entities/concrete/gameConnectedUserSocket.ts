import { Socket } from 'socket.io';

export class GameConnectedUserSocket {
    nameIdentifier: string;
    roomName: string;
    socket: Socket;
}