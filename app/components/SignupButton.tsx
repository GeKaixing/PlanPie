'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import { createPortal } from 'react-dom'

export default function SignupButton() {
  const [isShow, setIsShow] = React.useState(false)
  const [isSignup, setIsSignup] = React.useState(true)

  function handleSignup() {
    console.log('Signup')
  }

  function handleLogin() {
    console.log('Login')
  }

  return (
    <>
      <Button onClick={() => setIsShow(true)}>Signup</Button>

      {isShow && createPortal(
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setIsShow(false)} // ✅ 点击背景关闭
        >
          <form
            onClick={(e) => e.stopPropagation()} // ✅ 阻止点击表单冒泡关闭
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
              <Input name="email" />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-gray-600">Password</span>
              <Input name="password" type="password" />
            </label>

            <Button type="submit" className="w-full">
              {isSignup ? 'Create Account' : 'Login'}
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
