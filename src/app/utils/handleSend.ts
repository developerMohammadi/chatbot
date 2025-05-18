import { Dispatch, SetStateAction } from 'react'

type Message = { role: 'user' | 'assistant'; content: string; time?: string }

export async function handleSend(
    input: string,
    messages: Message[],
    setMessages: Dispatch<SetStateAction<Message[]>>,
    setInput: Dispatch<SetStateAction<string>>,
    setIsTyping: Dispatch<SetStateAction<boolean>>
) {
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