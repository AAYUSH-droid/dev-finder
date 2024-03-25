import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';

type EventType = 'user.created';

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: 'event';
  type: EventType;
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log('WEBHOOK_SECRET', WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    console.log('event: ', evt);
    //only id and email is req for now
    const user_id = evt.data.id;
    const email_address = evt.data.email_addresses[0].email_address;
    console.log('id', user_id);
    console.log('email_address', email_address);

    await db.insert(users).values({ id: user_id, email: email_address });
    console.log(
      `User created and stored in db with id : ${user_id} and email : ${email_address}`
    );
  }

  return NextResponse.json({ message: 'User created' }, { status: 201 });
}
