'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Assistant } from '../assistant';

export default function AiButton() {
    const [isShow, setShow] = useState(false)
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        setResponse(data.result);
    };
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
                    {/* <main className="h-[500px] p-8 ">
                        <h1 className="text-3xl font-bold mb-4">AI Chat App</h1>
                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            rows={4}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <Button
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        {response && <div className="mt-4 p-4 bg-white rounded">{response}</div>}
                    </main> */}
                </div> 
                <Assistant></Assistant>
            </div>}
        </>
    )
}
