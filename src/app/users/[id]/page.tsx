'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

type Geo = {
  lat: string
  lng: string
}

type Address = {
  street: string
  city: string
  geo: Geo
}

type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: Address
}

export default function UserProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data: User) => setUser(data))
  }, [id])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16 text-white">
        <p className="text-2xl font-medium">Loading...</p>
      </div>
    )
  }

  const lat = user.address.geo.lat
  const lng = user.address.geo.lng
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent tracking-wide drop-shadow-md">
          USER PROFILE
        </h1>

        <Card className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] border-none shadow-2xl rounded-3xl p-8 sm:p-12 text-white transition-all duration-300 hover:shadow-[#EE7879]/50 hover:scale-105">
          <CardContent>
            <div className="space-y-8">
              <div>
                <label className="block text-xl sm:text-2xl font-semibold text-[#FFD6D5] mb-3">Name</label>
                <p className="text-xl sm:text-2xl text-white">{user.name}</p>
              </div>

              <div>
                <label className="block text-xl sm:text-2xl font-semibold text-[#FFD6D5] mb-3">Username</label>
                <p className="text-xl sm:text-2xl text-white">{user.username}</p>
              </div>

              <div>
                <label className="block text-xl sm:text-2xl font-semibold text-[#FFD6D5] mb-3">Email</label>
                <p className="text-xl sm:text-2xl text-white">{user.email}</p>
              </div>

              <div>
                <label className="block text-xl sm:text-2xl font-semibold text-[#FFD6D5] mb-3">Phone</label>
                <p className="text-xl sm:text-2xl text-white">{user.phone}</p>
              </div>

              <div>
                <label className="block text-xl sm:text-2xl font-semibold text-[#FFD6D5] mb-3">Address</label>
                <p className="text-xl sm:text-2xl text-white">{user.address.street}, {user.address.city}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Location on Google Map</h2>
                <div className="relative shadow-lg rounded-xl overflow-hidden">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="400"
                    className="border-none"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <button
                className="mt-8 w-full bg-[#EE7879] hover:bg-[#f7d3d3] hover:text-black text-white font-semibold py-5 px-6 rounded-xl shadow-md transition duration-300 hover:scale-105 text-xl"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

