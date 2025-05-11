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
        <p className="text-xl sm:text-2xl font-semibold animate-pulse">Loading...</p>
      </div>
    )
  }

  const lat = user.address.geo.lat
  const lng = user.address.geo.lng
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10 sm:py-16 text-white">
      <div className="w-full max-w-3xl">
        {/* User Profile Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-4 sm:mb-8 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent tracking-tight leading-tight">
          USER PROFILE
        </h1>

        {/* Go Back Button */}
        <button
          className="mb-6 sm:mb-8 w-full bg-[#EE7879] hover:bg-[#f7d3d3] hover:text-black text-white font-semibold py-3 sm:py-4 px-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-base sm:text-lg"
          onClick={() => router.back()}
        >
          ← Go Back
        </button>

        {/* Profile Card */}
        <Card className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] border-none shadow-xl rounded-2xl sm:rounded-3xl p-5 sm:p-10 transition-all duration-300 hover:shadow-[#EE7879]/50 hover:scale-[1.02]">
          <CardContent className="space-y-6 sm:space-y-8">
            {[
              { label: 'Name', value: user.name },
              { label: 'Username', value: user.username },
              { label: 'Email', value: user.email },
              { label: 'Phone', value: user.phone },
              { label: 'Address', value: `${user.address.street}, ${user.address.city}` },
            ].map((item, i) => (
              <div key={i}>
                <label className="block text-lg sm:text-2xl font-semibold text-[#FFD6D5] mb-2 sm:mb-3">
                  {item.label}
                </label>
                <p className="text-lg sm:text-2xl text-white transition-all duration-200 hover:bg-[#f7d3d3] hover:text-[#2b1010] font-medium tracking-wide py-1 sm:py-2 px-2 rounded-md shadow-sm hover:shadow-lg break-words">
                  {item.value}
                </p>
              </div>
            ))}

            <div className="mt-6">
              <h2 className="text-lg sm:text-2xl font-semibold text-white mb-3">Location on Google Map</h2>
              <div className="relative rounded-lg overflow-hidden shadow-lg ring-1 ring-[#FFD6D5]/50">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="300"
                  className="w-full h-[300px] sm:h-[400px] rounded-lg border-none"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
