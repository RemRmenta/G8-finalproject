'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/, 'Start with uppercase and use letters only, with optional spaces between names'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/, 'Start with uppercase and use letters only, with optional spaces between names'),

  email: z
    .string()
    .email('Invalid email format')
    .nonempty('Email cannot be empty')
    .regex(/^[a-z0-9]+@gmail\.com$/, 'Use lowercase letters/numbers only and end with @gmail.com'),
  
  phone: z
    .string()
    .nonempty('Phone number is required')
    .regex(/^09\d{9}$/, 'Phone must be 11 digits and start with 09'),
  
  coordinates: z
    .string()
    .nonempty('Coordinates cannot be empty')
    .regex(
      /^(-?\d{1,3}(\.\d+)?),\s*(-?\d{1,3}(\.\d+)?)$/,
      'Coordinates should be in format: 13.3603,123.7104'
    )
    .refine((val) => {
      const [lat, lon] = val.split(',').map((coord) => parseFloat(coord.trim()));
      return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    }, 'Latitude must be between -90 and 90, Longitude between -180 and 180'),
})

type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const coordinates = watch('coordinates')
  const [embedLink, setEmbedLink] = useState('')
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  useEffect(() => {
    const isValidCoords = /^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/.test(coordinates || '')
    if (isValidCoords) {
      setEmbedLink(`https://www.google.com/maps?q=${coordinates}&output=embed`)
    } else {
      setEmbedLink('')
    }
  }, [coordinates])

  const onSubmit = (data: FormData) => {
    // Display a success message
    setAlertMessage('Registration Successful! Welcome to our platform.')

    // Clear the form after submission
    reset()

    // Automatically remove the alert after 5 seconds
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
    
    console.log('Registered:', data)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent tracking-wide drop-shadow-md">
          REGISTER TO CREATE ACCOUNT
        </h1>

        {alertMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-2xl border border-[#EE7879] text-center z-50">
            {alertMessage}
          </div>
        )}


        <Card className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] border-none shadow-2xl rounded-3xl p-8 sm:p-12 text-white transition-all duration-300 hover:shadow-[#EE7879]/50 hover:scale-105">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {[ 
                { label: 'First Name', name: 'firstName', placeholder: 'e.g. John' },
                { label: 'Last Name', name: 'lastName', placeholder: 'e.g. Doe' },
                { label: 'Email', name: 'email', placeholder: 'e.g. johndoe@gmail.com' },
                { label: 'Phone Number', name: 'phone', placeholder: 'e.g. 09123456789' },
                { label: 'Coordinates', name: 'coordinates', placeholder: 'e.g. 12.3456,78.9012' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-lg font-semibold text-[#FFD6D5] mb-3">{label}</label>
                  <input
                    {...register(name as keyof FormData)}
                    placeholder={placeholder}
                    className="w-full p-5 rounded-xl bg-[#1f1f1f] text-white border border-[#EE7879] placeholder:text-gray-400 focus:ring-2 focus:ring-[#f7d3d3] outline-none transition duration-200 text-lg"
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-600 text-base mt-2">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              {embedLink && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-white mb-2">Your Location</h2>
                  <iframe
                    src={embedLink}
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    className="rounded-xl border border-gray-300"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#EE7879] hover:bg-[#f7d3d3] hover:text-black text-white font-semibold py-5 px-6 rounded-xl shadow-md transition duration-300 hover:scale-105 text-lg"
              >
                Register
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
