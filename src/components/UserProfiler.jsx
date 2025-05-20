'use client'

import { signOut, useSession } from "next-auth/react"

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <img
        src={session.user.image}
        alt="User"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-medium">{session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="text-sm text-gray-500 hover:text-black"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}