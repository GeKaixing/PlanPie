// app/email-confirmed/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export default function EmailConfirmedPage() {
  const [message, setMessage] = useState('正在确认...')
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setMessage('邮箱确认成功，正在跳转...')
        router.push('/')
      } else {
        setMessage('邮箱已确认，请重新登录')
        setTimeout(() => router.push('/login'), 3000)
      }
    }

    checkSession()
  }, [router])

  return <p>{message}</p>
}
