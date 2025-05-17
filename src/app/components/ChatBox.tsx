'use client'
import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string; time?: string }

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
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return
        const now = new Date().toLocaleTimeString('fa-IR')
        const userMessage: Message = { role: 'user', content: input, time: now }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        setIsTyping(true)
        try {
            const res = await fetch('https://mocki.io/v1/abcd1234', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] })
            })
            const data = await res.json()
            const bot = data.choices[0].message
            const botMessage: Message = { role: 'assistant', content: bot.content, time: new Date().toLocaleTimeString('fa-IR') }
            setMessages(prev => [...prev, botMessage])
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: 'خطا در دریافت پاسخ', time: new Date().toLocaleTimeString('fa-IR') }])
        }
        setIsTyping(false)
    }

    return (
        <div className="flex flex-col h-screen p-4 bg-base-200">
            <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-bubble">{msg.content}</div>
                        <div className="text-xs mt-1">{msg.time}</div>
                    </div>
                ))}
                {isTyping && <div className="italic text-sm">در حال تایپ...</div>}
                <div ref={endRef} />
            </div>
            <div className="mt-2 flex">
                <input
                    className="input input-bordered flex-grow"
                    placeholder="پیامت را بنویس..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button className="btn btn-primary mr-2" onClick={handleSend}>ارسال</button>
            </div>
        </div>
    )
}