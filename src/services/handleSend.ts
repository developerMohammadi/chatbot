import axios from "axios"
import { Message } from "@/types/index.t"
import { Dispatch, SetStateAction } from "react"

export async function handleSend(
    input: string,
    messages: Message[],
    setMessages: Dispatch<SetStateAction<Message[]>>,
    setInput: Dispatch<SetStateAction<string>>,
    setIsTyping: Dispatch<SetStateAction<boolean>>,
) {
    if (!input.trim()) return



    const userMessage: Message = { role: 'user', content: input, time:  new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit',})}

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
        const response = await axios.post('https://mocki.io/v1/abcd1234', {
            messages: [...messages, userMessage]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const botMessage: Message = {
            role: 'assistant',

            content: response.data?.choices?.[0]?.messages || 'پاسخی دریافت نشد',

            time: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit',})
        }

        setMessages(prev => [...prev, botMessage])
    } catch  {
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'سلام خوبم تو چطوری ؟',
            time:  new Date().toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
            })
        }])
    }

    setIsTyping(false)
}
