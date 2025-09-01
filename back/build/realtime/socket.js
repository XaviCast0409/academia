"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketServer = initializeSocketServer;
exports.getSocketIO = getSocketIO;
exports.emitToAll = emitToAll;
exports.emitToUser = emitToUser;
const socket_io_1 = require("socket.io");
const validations_1 = require("../utils/validations");
let io = null;
function initializeSocketServer(httpServer) {
    if (io)
        return io;
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        },
    });
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token || socket.handshake.headers['authorization']?.replace('Bearer ', '') || '';
            if (!token)
                return next(new Error('Unauthorized'));
            const decoded = (0, validations_1.verifyToken)(token);
            socket.userId = decoded.id;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
    io.on('connection', (socket) => {
        const userId = socket.userId;
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
function getSocketIO() {
    if (!io) {
        throw new Error('Socket.IO server not initialized');
    }
    return io;
}
function emitToAll(event, payload) {
    if (!io)
        return;
    io.to('all_users').emit(event, payload);
}
function emitToUser(userId, event, payload) {
    if (!io)
        return;
    io.to(`user:${userId}`).emit(event, payload);
}
