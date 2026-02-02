'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadPosts()
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  const loadPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    setPosts(data || [])
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>

      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          {/* Render post HTML content */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>By: {post.author_email}</p>
        </div>
      ))}
    </div>
  )
}
