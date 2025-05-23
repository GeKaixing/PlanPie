'use client'

import React, { useState } from 'react'
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
// import { ThreadList } from "@/components/assistant-ui/thread-list";


export default function AiButton() {
    const [isShow, setShow] = useState(false)
    const runtime = useChatRuntime({
        api: "/api/chat",
    });

    
    return (
        <>
            <div
                onClick={() => { setShow(true) }}
                className="bg-red-100/50 hover:bg-red-100 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center mx-auto">AI</div>

            {isShow && <div
                onClick={() => {
                    setShow(false)
                }}
                className='bg-black/30 fixed inset-0 flex justify-center items-center'>
                <div
                    onClick={e => e.stopPropagation()}
                    className='w-full max-w-[410px] h-[500px] bg-red-100 flex justify-center items-center flex-col gap-4 '>
                    <AssistantRuntimeProvider runtime={runtime}>
                        <div className="w-full h-full relative" >
                            <div
                                onClick={() => {
                                    setShow(false)
                                }}
                                className='absolute top-1 right-1 w-10 h-10 bg-pink-50 hover:bg-pink-100 rounded-full flex justify-center items-center font-bold text-2xl cursor-pointer'>x</div>
                            {/* <ThreadList /> */}
                            <Thread />
                        </div>
                    </AssistantRuntimeProvider>
                </div>

            </div>}
        </>
    )
}
