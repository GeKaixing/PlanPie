'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateTodoAction } from '@/lib/data'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useActionState } from 'react'

export default function UpDateButton({ id, content }: { id: string, content: string }) {
  const [isShow, setIsShow] = React.useState(false)
  const [state, formAction, isPending] = useActionState(updateTodoAction, { success: false })

  useEffect(() => {
    if (state?.success) {
      setIsShow(false)
    }
  }, [state])

  return (
    <>
      <Button onClick={() => setIsShow(true)}>update</Button>
      {isShow && createPortal(
        <div className='fixed inset-0 bg-black/70 z-50'>
          <form
            className='absolute top-1/2 left-1/2 -translate-1/2 max-w-[600px] min-h-[200px] border p-4 border-gray-200
              rounded-2xl flex flex-col bg-white gap-4'
            action={formAction}
          >
            <input type="hidden" name="id" value={id} />
            <Input name="content" defaultValue={content} disabled={isPending} />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
            <Button
              type="button"
              onClick={() => setIsShow(false)}
              disabled={isPending}
              className='bg-white hover:bg-gray-200 text-black hover:text-black'
            >
              Cancel
            </Button>
          </form>
        </div>,
        document.body
      )}
    </>
  )
}
