'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [unauthorized, setUnauthorized] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    router.push('/login')
  }

  useEffect(() => {
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('userId')

    if (!role || (role !== 'admin' && !userId)) {
      setUnauthorized(true)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return
    }

    const fetchData = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ])
        const postsData: Post[] = await postsRes.json()
        const commentsData: Comment[] = await commentsRes.json()

        if (role === 'admin') {
          setPosts(postsData)
          setComments(commentsData)
        } else {
          const filteredPosts = postsData.filter(p => p.userId.toString() === userId)
          const filteredPostIds = filteredPosts.map(p => p.id)
          const filteredComments = commentsData.filter(c => filteredPostIds.includes(c.postId))
          setPosts(filteredPosts)
          setComments(filteredComments)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  return (
    <main className="min-h-screen bg-gray-900 px-8 py-20 text-white">
      <div className="max-w-5xl mx-auto">
        {unauthorized ? (
          <div className="text-center text-red-500 text-2xl font-bold mt-20">Unauthorized</div>
        ) : (
          <>
            <div className="flex justify-center items-center mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent drop-shadow-lg tracking-wide font-sans">
                POSTS
              </h1>
            </div>

            <div className="mb-10 flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-[#EE7879] hover:bg-[#f7d3d3] hover:text-black text-white font-semibold py-4 px-6 rounded-xl shadow-md transition duration-300 hover:scale-105 text-lg"
              >
                Logout
              </button>
            </div>

            {loading ? (
              <div className="text-center text-lg font-medium">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-lg text-gray-400">No posts found.</div>
            ) : (
              posts.map(post => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.02 }}
                  className="mb-6"
                  onClick={() =>
                    setSelectedPostId(prev => (prev === post.id ? null : post.id))
                  }
                >
                  <Card className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] text-white border-none rounded-3xl shadow-2xl transition-shadow duration-300 hover:shadow-[#EE7879]/50 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#FFD6D5]">{post.title}</CardTitle>
                    </CardHeader>

                    {selectedPostId === post.id && (
                      <CardContent className="space-y-4">
                        <p>{post.body}</p>
                        <div>
                          <h3 className="text-lg font-semibold text-[#FFD6D5]">Comments:</h3>
                          {comments
                            .filter(c => c.postId === post.id)
                            .map(comment => (
                              <div
                                key={comment.id}
                                className="bg-[#2b1010] p-4 rounded-lg mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                              >
                                <div className="flex items-center space-x-4 mb-2">
                                  <div className="w-10 h-10 rounded-full bg-[#EE7879] flex items-center justify-center text-white text-lg font-semibold">
                                    {comment.name[0]}
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{comment.name}</p>
                                    <p className="text-xs text-gray-400">{comment.email}</p>
                                  </div>
                                </div>
                                <p className="text-white">{comment.body}</p>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </>
        )}
      </div>
    </main>
  )
}
