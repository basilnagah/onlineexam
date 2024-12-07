'use client'
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation';
import React from 'react'

export default function home() {
  const router = useRouter();

  const { data, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })

  return (
    <div>home</div>
  )
}
