import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import db from '../../config/database';

const expo = new Expo();

export async function getUserPushTokens(userIds: number[]): Promise<string[]> {
  // Assuming users table has pushToken; adapt if you store tokens in another table
  const users = await db.User.findAll({ where: { id: userIds }, attributes: ['id', 'pushToken'], raw: true });
  const tokens: string[] = [];
  for (const u of users) {
    if (u.pushToken && Expo.isExpoPushToken(u.pushToken)) tokens.push(u.pushToken);
  }
  return tokens;
}

export async function sendPushToTokens(tokens: string[], message: Omit<ExpoPushMessage, 'to'>) {
  if (!tokens.length) return [] as ExpoPushTicket[];
  const chunks = expo.chunkPushNotifications(tokens.map((t) => ({ to: t, ...message })));
  const receipts: ExpoPushTicket[] = [];
  for (const chunk of chunks) {
    try {
      const res = await expo.sendPushNotificationsAsync(chunk);
      receipts.push(...res);
    } catch (error) {
      console.error('[PUSH] Error sending chunk', error);
    }
  }
  return receipts;
}


