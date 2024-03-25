// 'use server';

// import { db } from '@/db';
// import { User, users } from '@/db/schema';

// export async function createUserAction(
//   user: Omit<User, 'name' | 'emailVerified' | 'image'>,
//   id: string,
//   email: string
// ) {
//   if (!id || !email) {
//     throw new Error('User not found');
//   }
//   await db.insert(users).values({ ...user, id: id, email: email });
// }
