'use client'
import {useEffect, useRef, useState} from 'react'
import axios from "axios";
import {handleSend} from "@/app/utils/handleSend";

interface Message {
    role: 'user' | 'assistant';
    content: string;
    time?: string
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>(() => {
        // load from localStorage if exists
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('chat-messages')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('chat-messages', JSON.stringify(messages))
        }
        // scroll to bottom
        endRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    // const handleSend = async () => {
    //     if (!input.trim()) return
    //
    //     const now = new Date().toLocaleTimeString('fa-IR')
    //     const userMessage: Message = {role: 'user', content: input, time: now}
    //     setMessages(prev => [...prev, userMessage])
    //     setInput('')
    //     setIsTyping(true)
    //
    //     try {
    //         const response = await axios.post(
    //             'https://mocki.io/v1/abcd1234',
    //             { messages: [userMessage] },
    //             { headers: { 'Content-Type': 'application/json' } }
    //         )
    //
    //         const bot = response.data.choices?.[0]?.message
    //         const botMessage: Message = {
    //             role: 'assistant',
    //             content: bot?.content || 'پاسخی دریافت نشد',
    //             time: new Date().toLocaleTimeString('fa-IR')
    //         }
    //         setMessages(prev => [...prev, botMessage])
    //     } catch {
    //         setMessages(prev => [...prev, {
    //             role: 'assistant',
    //             content:  'خطا در دریافت پاسخ',
    //             time: new Date().toLocaleTimeString('fa-IR')
    //         }])
    //     }
    //
    //     setIsTyping(false)
    // }
    return (
        <div className="flex flex-col p-4 bg-base-200 ">
            <div className="flex-1 overflow-y-auto space-y-4 pb-[30px]">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
                    >
                        <div className={`chat-bubble ${msg.role === 'user' ? 'bg-info' : 'bg-warning'}`}>
                            <div
                                className={`flex justify-between gap-4 text-xs mb-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div>{msg.time}</div>
                                <div>{msg.content}</div>
                            </div>
                            {/*<div></div>*/}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="italic text-sm">در حال تایپ...</div>}
                <div ref={endRef}/>
            </div>
            <div className="mt-2 flex fixed bottom-4 z-1 w-[94%]">
                <input
                    className="input input-bordered flex-grow text-base"
                    placeholder="پیامت را بنویس..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input, messages, setMessages, setInput, setIsTyping)}
                />
                <button className="btn btn-primary mr-2 btn-circle" onClick={() => handleSend(input, messages, setMessages, setInput, setIsTyping)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-send" viewBox="0 0 16 16">
                        <path
                            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>

                </button>
            </div>
        </div>
    )
}