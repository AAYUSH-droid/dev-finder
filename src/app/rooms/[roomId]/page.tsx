import { getRoom } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { SplitTags, TagsList } from '@/components/tags-list';

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomID = props.params.roomId;
  const room = await getRoom(roomID);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className='grid grid-cols-4 min-h-screen'>
      <div className='col-span-3 p-4 pr-2'>
        {/* <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
        <DevFinderVideo room={room} />
      </div> */}
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen'>
          VIDEO PLAYER
        </div>
      </div>

      <div className='col-span-1 p-4 pl-2'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4'>
          <h1 className='text-base'>{room?.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className='flex items-center gap-2 text-center text-sm'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className='text-base text-gray-600'>{room?.description}</p>

          <div className='flex gap-2 flex-wrap'>
            <TagsList tags={SplitTags(room.tags)} />
          </div>
        </div>
      </div>
    </div>
  );
}
