import { db } from '@/db';
import GetLoggedInUser from './user';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Room } from '@/db/schema';
import { GithubIcon } from 'lucide-react';
import { getRooms } from '@/data-access/rooms';

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className='flex items-center gap-2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon />
            Github Repo
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}> Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  // const rooms = await db.query.room.findMany();
  const rooms = await getRooms();

  return (
    <main className=' min-h-screen  p-24'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl'>Find Dev Rooms</h1>
        <Button>
          <Link href='/create-room'> Create Rooms</Link>
        </Button>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          {rooms.map((room) => {
            return (
              // <div key={room.id}>
              //   {room.name} , {room.id}
              // </div>
              <RoomCard key={room.id} room={room} />
            );
          })}
        </div>
        <div className='pb-5 mx-auto mt-10'>
          <GetLoggedInUser />
        </div>
      </div>
    </main>
  );
}
