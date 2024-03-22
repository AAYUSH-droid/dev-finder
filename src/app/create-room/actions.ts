'use server';

import { db } from '@/db';
import { Room, room } from '@/db/schema';

export async function createRoomAction(
  roomData: Omit<Room, 'id' | 'userId'>,
  userId: string | null | undefined //doing this because the userID coming from clerk has string | null | undefined
) {
  //the user id entered here should be same as user.id in the users table
  await db.insert(room).values({ ...roomData, userId: userId });
}
