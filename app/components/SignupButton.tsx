'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import { createPortal } from 'react-dom'

type Mode = 'signup' | 'signin' | 'forgot-password'

export default function SignupButton() {
  const [isShow, setIsShow] = React.useState(false)
  const [mode, setMode] = React.useState<Mode>('signup')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  async function handleSignup() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      // window.location.reload()
    } else {
      const d = await res.json()
      console.log(d)
      setError(d.message || 'Sign up failed')
    }
    setLoading(false)
  }

  async function handleLogin() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      window.location.reload()
    } else {
      const d = await res.json()
      console.log(d)
      setError(d.message || 'Login failed')
    }
    setLoading(false)
  }

  async function handleForgotPassword() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email }),
    })
    if (res.ok) {
      setError('Check your email for reset link.')
    } else {
      const d = await res.json()
      console.log(d)
      setError(d.message || 'Failed to send reset link')
    }
    setLoading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.email) return
    if (mode !== 'forgot-password' && !formData.password) return

    if (mode === 'signup') handleSignup()
    else if (mode === 'signin') handleLogin()
    else if (mode === 'forgot-password') handleForgotPassword()
  }

  return (
    <>
      <Button onClick={() => setIsShow(true)}>Sign Up / Sign In</Button>

      {isShow &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={() => setIsShow(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              className="max-w-[700px] min-w-[350px] w-full min-h-[300px] border p-6 border-gray-200 rounded-2xl bg-white flex flex-col gap-4 shadow-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl font-bold text-center capitalize">
                {mode.replace('-', ' ')}
              </h2>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-600">Email</span>
                <Input name="email" value={formData.email} onChange={handleChange} />
              </label>

              {mode !== 'forgot-password' && (
                <label className="space-y-1">
                  <span className="text-sm font-medium text-gray-600">Password</span>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? mode === 'signup'
                    ? 'Creating...'
                    : mode === 'signin'
                      ? 'Logging in...'
                      : 'Sending...'
                  : mode === 'signup'
                    ? 'Create Account'
                    : mode === 'signin'
                      ? 'Login'
                      : 'Send Reset Link'}
              </Button>

              <div className="flex justify-center space-x-4 text-sm mt-2">
                <span
                  onClick={() => setMode('signup')}
                  className={cn(
                    'cursor-pointer transition-all',
                    mode === 'signup' ? 'font-bold text-black underline' : 'text-gray-400 hover:text-black'
                  )}
                >
                  Sign Up
                </span>
                <span>/</span>
                <span
                  onClick={() => setMode('signin')}
                  className={cn(
                    'cursor-pointer transition-all',
                    mode === 'signin' ? 'font-bold text-black underline' : 'text-gray-400 hover:text-black'
                  )}
                >
                  Sign In
                </span>
                <span>/</span>
                <span
                  onClick={() => setMode('forgot-password')}
                  className={cn(
                    'cursor-pointer transition-all',
                    mode === 'forgot-password' ? 'font-bold text-black underline' : 'text-gray-400 hover:text-black'
                  )}
                >
                  Forgot Password
                </span>
              </div>
            </form>
          </div>,
          document.body
        )}
    </>
  )
}
