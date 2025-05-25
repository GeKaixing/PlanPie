'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function page() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  )
} 

function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // URL 参数中包含的重置 token
  const accessToken = searchParams.get('access_token') || ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!password) {
      setError('Please enter a new password.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!accessToken) {
      setError('Invalid or missing reset token.')
      return
    }

    setLoading(true)

    // 调用 Supabase REST API 或你后端的接口重置密码
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, password }),
      })

      if (res.ok) {
        setSuccess('Password reset successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login') // 重置成功后跳转登录页
        }, 3000)
      } else {
        const data = await res.json()
        setError(data.message || 'Failed to reset password.')
      }
    } catch {
      setError('Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            <span className="block mb-1 font-medium">New Password</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </label>

          <label>
            <span className="block mb-1 font-medium">Confirm Password</span>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
  )
}
