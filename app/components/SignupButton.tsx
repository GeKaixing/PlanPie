'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import { createPortal } from 'react-dom'

export default function SignupButton() {
  const [isShow, setIsShow] = React.useState(false)
  const [isSignup, setIsSignup] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  async function handleSignup() {
    setLoading(true)
    setError('')

    setLoading(false)
  }

  async function handleLogin() {
    setLoading(true)
    setError('')
    if(!formData.email)return;
    if(!formData.password)return;
   const res= await fetch('/api/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
    if(res.ok){
      window.location.reload()
    }else{
      const d =await res.json()
      console.log(d)
    }
    setLoading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Button onClick={() => setIsShow(true)}>Sign Up/Sign In</Button>

      {isShow &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={() => setIsShow(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              className="max-w-[700px] min-w-[350px] w-full min-h-[300px] border p-6 border-gray-200 rounded-2xl bg-white flex flex-col gap-4 shadow-lg"
              onSubmit={(e) => {
                e.preventDefault()
                isSignup ? handleSignup() : handleLogin()
              }}
            >
              <h2 className="text-xl font-bold text-center">
                {isSignup ? 'Sign Up' : 'Sign In'}
              </h2>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-600">Email</span>
                <Input name="email" value={formData.email} onChange={handleChange} />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-600">Password</span>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? isSignup
                    ? 'Creating...'
                    : 'Logging in...'
                  : isSignup
                    ? 'Create Account'
                    : 'Login'}
              </Button>

              <div className="flex justify-center space-x-4 text-sm mt-2">
                <span
                  onClick={() => setIsSignup(true)}
                  className={cn(
                    'cursor-pointer transition-all',
                    isSignup ? 'font-bold text-black underline' : 'text-gray-400 hover:text-black'
                  )}
                >
                  Sign Up
                </span>
                <span>/</span>
                <span
                  onClick={() => setIsSignup(false)}
                  className={cn(
                    'cursor-pointer transition-all',
                    !isSignup ? 'font-bold text-black underline' : 'text-gray-400 hover:text-black'
                  )}
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>,
          document.body
        )}
    </>
  )
}
