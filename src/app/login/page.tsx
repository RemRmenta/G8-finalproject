'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

type JsonUser = {
  id: number
  name: string
  username: string
  email: string
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const users: JsonUser[] = await res.json()

      if (email === 'admin@admin.com' && password === 'admin123') {
        localStorage.setItem('role', 'admin')
        router.push('/posts')
        return
      }

      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (user && user.username === password) {
        localStorage.setItem('role', 'user')
        localStorage.setItem('userId', user.id.toString())
        localStorage.setItem('userName', user.name)
        router.push('/posts')
      } else {
        setError('Invalid credentials. Email must match a user and password must be the corresponding username.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent drop-shadow-lg tracking-wide font-sans">
          LOGIN TO VIEW POSTS
        </h1>

        <Card className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] border-none shadow-2xl rounded-3xl p-8 sm:p-12 text-white transition-all duration-300 hover:shadow-[#EE7879]/50 hover:scale-105">
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-[#FFD6D5] mb-3">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 rounded-xl bg-[#1f1f1f] text-white border border-[#EE7879] placeholder:text-gray-400 focus:ring-2 focus:ring-[#f7d3d3] outline-none transition duration-200 text-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-[#FFD6D5] mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-5 rounded-xl bg-[#1f1f1f] text-white border border-[#EE7879] placeholder:text-gray-400 focus:ring-2 focus:ring-[#f7d3d3] outline-none transition duration-200 text-lg"
                  placeholder="Enter your username"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-base font-medium">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#EE7879] hover:bg-[#f7d3d3] hover:text-black text-white font-semibold py-5 px-6 rounded-xl shadow-md transition duration-300 hover:scale-105 text-lg"
              >
                Login
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
