import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyToken } from '../utils/validations';

let io: Server | null = null;

export function initializeSocketServer(httpServer: HttpServer) {
  if (io) return io;

  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  io.use((socket: Socket, next: (err?: Error) => void) => {
    try {
      const token = (socket.handshake.auth?.token as string) || (socket.handshake.headers['authorization'] as string)?.replace('Bearer ', '') || '';
      if (!token) return next(new Error('Unauthorized'));
      const decoded: any = verifyToken(token);
      (socket as any).userId = decoded.id;
      return next();
    } catch (err) {
      return next(err as any);
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId;
    if (userId) {
      socket.join(`user:${userId}`);
    }
    socket.join('all_users');

    socket.on('disconnect', () => {
      // connection closed
    });
  });

  return io;
}

export function getSocketIO(): Server {
  if (!io) {
    throw new Error('Socket.IO server not initialized');
  }
  return io;
}

export function emitToAll(event: string, payload: unknown) {
  if (!io) return;
  io.to('all_users').emit(event, payload);
}

export function emitToUser(userId: number, event: string, payload: unknown) {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, payload);
}


