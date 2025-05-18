'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function LogoutButton({ children }: { children: React.ReactNode }) {
    async function logout() {
      const res=  await fetch('/api/logout', {
            method: 'POST',
        })
        if(res.ok){
            window.location.reload();
        }
    }
    return (
        <Button onClick={logout}>{children}</Button>
    )
}
