'use server';

import { db } from '@/db';
import { Room, room } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createRoomAction(
  roomData: Omit<Room, 'id' | 'userId'>,
  userId: string | null | undefined //doing this because the userID coming from clerk has string | null | undefined
) {
  if (!userId) {
    throw new Error('User not found');
  }
  //the user id entered here should be same as user.id in the users table
  await db.insert(room).values({ ...roomData, userId: userId });

  revalidatePath('/');
}
