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
      operation,
      data: hygraphData
    } = await req.json();

    await index.saveObject({ objectID: hygraphData.id, ...hygraphData });

    return NextResponse.json({ error: "Search updated" }, { status: 200 })
  } catch (err) {
    console.log(err)
    return  NextResponse.json({ error: `Error ${err}`}, { status: 500 });
  }
};