import { supabase } from '../../../lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // Search posts by title
  const { data, error } = await supabase
    .rpc('search_posts', { search_query: query })

  return Response.json({ results: data })
}

export async function POST(request) {
  const body = await request.json()

  // Create a new post - no auth needed for MVP
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: body.title,
      content: body.content,
      author_email: body.email,
    })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ post: data })
}
