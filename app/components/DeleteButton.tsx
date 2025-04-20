'use client'
import { Button } from '@/components/ui/button'
import { deleteTodo } from '@/lib/data'
// import { revalidatePath } from 'next/cache'
import React from 'react'

export default function DeleteButton({ id }: { id: string }) {
    return (
        <Button className="bg-red-400 hover:bg-red-600"
            onClick={async () => {
                await deleteTodo(id)
             
            }}
        >delete</Button>
    )
}
