import { getRoom } from '@/data-access/rooms';

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomID = props.params.roomId;
  const room = await getRoom(roomID);
  return (
    <div>
      <div>
        {/* <h1>Room ID: {roomID}</h1> */}
        <h2>{room?.name}</h2>
      </div>
    </div>
  );
}
