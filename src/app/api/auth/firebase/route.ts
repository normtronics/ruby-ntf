import initializeFirebaseServer from '@/utils/initFirebaseAdmin';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { address } = await request.json();

  if (!address) {
    return NextResponse.json({ error: 'No address' }, { status: 401 });
  }
  // Initialize the Firebase Admin SDK.
  const { auth } = initializeFirebaseServer();
  // Generate a JWT token for the user to be used on the client-side.
  const token = await auth.createCustomToken(address);

  // Send the token to the client-side.
  return NextResponse.json({ token }, { status: 200 });
}