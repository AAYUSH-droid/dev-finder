import { db } from '@/db';
import GetLoggedInUser from './user';

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {rooms.map((room) => {
        return (
          <div key={room.id}>
            {room.name} , {room.id}
          </div>
        );
      })}
      <div className='pb-5 mx-auto'>
        <GetLoggedInUser />
      </div>
    </main>
  );
}
