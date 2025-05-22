'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function LevelUp() {
    const [isShow, setShow] = useState(false)
    return (
        <>
            <span
                onClick={() => { setShow(true) }}
                className="hover:underline hover:text-black cursor-pointer ">Level-up</span>
            {isShow && <div
                onClick={() => {
                    setShow(false)
                }}
                className='bg-black/30 fixed inset-0 flex justify-center items-center'>
                <div
                    onClick={e => e.stopPropagation()}
                    className='w-full max-w-[410px] h-[500px] bg-red-100 flex justify-center items-center flex-col gap-4 '>
                    <span> 价格为 JP¥2,900/月</span>
                    <span>
                        ✔️   获得更多权限
                    </span>
                    <span>
                        ✔️   添加更多内容
                    </span>
                    <form action="/api/checkout_sessions" method="POST">
                        <section>
                            <Button type="submit" role="link">
                                Checkout
                            </Button>
                        </section>
                    </form>
                </div>

            </div >}
        </>
    )
}
