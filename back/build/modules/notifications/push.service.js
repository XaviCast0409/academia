"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPushTokens = getUserPushTokens;
exports.sendPushToTokens = sendPushToTokens;
const expo_server_sdk_1 = require("expo-server-sdk");
const database_1 = __importDefault(require("../../config/database"));
const expo = new expo_server_sdk_1.Expo();
async function getUserPushTokens(userIds) {
    // Assuming users table has pushToken; adapt if you store tokens in another table
    const users = await database_1.default.User.findAll({ where: { id: userIds }, attributes: ['id', 'pushToken'], raw: true });
    const tokens = [];
    for (const u of users) {
        if (u.pushToken && expo_server_sdk_1.Expo.isExpoPushToken(u.pushToken))
            tokens.push(u.pushToken);
    }
    return tokens;
}
async function sendPushToTokens(tokens, message) {
    if (!tokens.length)
        return [];
    const chunks = expo.chunkPushNotifications(tokens.map((t) => ({ to: t, ...message })));
    const receipts = [];
    for (const chunk of chunks) {
        try {
            const res = await expo.sendPushNotificationsAsync(chunk);
            receipts.push(...res);
        }
        catch (error) {
            console.error('[PUSH] Error sending chunk', error);
        }
    }
    return receipts;
}
