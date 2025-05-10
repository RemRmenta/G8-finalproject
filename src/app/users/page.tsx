'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type User = {
  id: number
  name: string
  username: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
  }, [])

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

  return (
    <main className="min-h-screen bg-gray-900 px-6 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent drop-shadow-lg tracking-wide font-sans">
          USERS
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by name or username"
            className="w-full sm:w-1/2 p-4 rounded-xl bg-[#1f1f1f] text-white border border-[#EE7879] placeholder:text-gray-400 focus:ring-2 focus:ring-[#f7d3d3] outline-none transition duration-200 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="p-4 rounded-xl bg-[#1f1f1f] text-white border border-[#EE7879] focus:ring-2 focus:ring-[#f7d3d3] outline-none text-lg"
          >
            <option value="asc">Sort A–Z</option>
            <option value="desc">Sort Z–A</option>
          </select>
        </div>

        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link
                href={`/users/${user.id}`}
                className="flex items-center gap-4 bg-gradient-to-br from-[#EE7879] to-[#2b1010] p-6 rounded-3xl shadow-lg hover:shadow-[#EE7879]/50 transition-all duration-300 hover:scale-105 text-white"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFD6D5] text-[#2b1010] font-bold flex items-center justify-center text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-300">@{user.username}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
