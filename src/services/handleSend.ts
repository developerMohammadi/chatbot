export async function handleSend(
    input: string,
    messages: Message[],
    setMessages: Dispatch<SetStateAction<Message[]>>,
    setInput: Dispatch<SetStateAction<string>>,
    setIsTyping: Dispatch<SetStateAction<boolean>>,
) {
    if (!input.trim()) return

    const now = new Date().toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
    })
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
        const botTime = new Date().toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
        })
        const botMessage: Message = { role: 'assistant', content: bot.content, time: botTime }
        setMessages(prev => [...prev, botMessage])
    }
    catch {
        const errorTime = new Date().toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
        })
        setMessages(prev => [...prev, { role: 'assistant', content: 'خطا در دریافت پاسخ', time: errorTime }])
    }
    setIsTyping(false)
}
