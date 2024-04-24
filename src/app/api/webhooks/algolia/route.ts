import algoliasearch from 'algoliasearch'
import { NextResponse } from 'next/server'

const algolia = algoliasearch(process.env.ALGOLIA_APP_ID || '', process.env.ALGOLIA_ADMIN_API_KEY || '');

const index = algolia.initIndex('nfts');

export async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Only Post' }, { status: 401 });

  if (req.headers.get('authorization') !== process.env.WEBHOOK_SECRET_KEY)
    NextResponse.json({ error: 'Auth Wrong' }, { status: 401 });

  try {
    const {
      data: { PUBLISHED },
    } = await req.json();

    const { id: objectID, ...data } = PUBLISHED;

    await index.saveObject({ objectID, ...data });

    return NextResponse.json({ error: "Search updated" }, { status: 200 })
  } catch (err) {
    return  NextResponse.json({ error: 'Error' }, { status: 500 });
  }
};