import { supabase } from '../../../lib/supabase'

// GET all users - for the admin dashboard
export async function GET(request) {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ users: data })
}

// DELETE user by ID
export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
