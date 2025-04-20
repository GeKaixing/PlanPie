'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import React from 'react'
import { createPortal } from 'react-dom'

export default function SignupButton() {
    const [isShow, setIsShow] = React.useState(false)
    // const [state,signupActions,isPending]=useActionState(signupAction,0)
    const [isSignup, setSignup] = React.useState(true)
    function Signup() {
        console.log('Signup')
    }
    function Signing() {
        console.log('Signing')
    }
    const style = clsx({
        'text-2xl text-black        ': isSignup,
        'text-base text-gray-200     ': !isSignup,
    })
    const style2 = clsx({
        'text-2xl text-black ': !isSignup,
        'text-base text-gray-200  ': isSignup,
    })
    return (
        <>
            <Button onClick={() => { setIsShow(true) }}>signup</Button>
            {isShow && createPortal(<div className='fixed inset-0 bg-black/70 z-50
       
            '>
                <form
                    className='absolute top-1/2 left-1/2 -translate-1/2 max-w-[700px] min-h-[200px] border p-4 border-gray-200
              rounded-2xl flex flex-col bg-white gap-4'
                // action={signupActions}
                >
                    <span className='font-bold text-center'>{isSignup ? 'signup' : 'signing'}</span>
                    <label>
                        email
                        <Input name="email" />
                    </label>
                    <label>
                        password
                        <Input name="password" type='password' />
                    </label>
                    <Button type="submit"
                        onClick={(e) => {
                            e.preventDefault();

                            if (isSignup) {
                                Signup();
                            } else {
                                Signing();
                            }
                        }}>submit</Button>
                    <div className='flex '>
                        <div onClick={() => { setSignup(true); }}
                            className={cn('transition-all duration-300 ease-in-out',style)}
                        >signup</div>/
                        <div
                            className={cn('transition-all duration-300 ease-in-out',style2)}
                            onClick={() => { setSignup(false); }}  >signing</div>
                    </div>
                </form>
            </div>, document.body)}
        </>

    )
}
