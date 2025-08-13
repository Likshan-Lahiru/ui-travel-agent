import React, { useEffect, useState } from 'react'
import { sendChatMessageToAPI, ChatResponse } from '../../services/chatService'
import { MicIcon, SendIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { addMessage } from '../../features/chat/chatSlice'
export default function ChatInterface() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [apiResponse, setApiResponse] = useState<ChatResponse | null>(null)
    const dispatch = useDispatch()
    // Initial Paris response data
    const parisResponse = {
        llm_response:
            "Paris, the City of Light, is a must-visit destination for any traveler. A 3-day trip to Paris can be a whirlwind of art, history, fashion, and romance. Here's a suggested itinerary for your 3-day trip to Paris.",
        prompt_list: [
            'What are the must-visit attractions in Paris?',
            'How do I get around Paris?',
            'What is the best time to visit Paris?',
        ],
    }
    useEffect(() => {
        // Add initial agent message when component mounts

    }, [dispatch])
    const handleSend = async () => {
        if (!input.trim() || loading) return
        // Add user message to redux
        dispatch(
            addMessage({
                content: input,
                sender: 'user',
            }),
        )
        setLoading(true)
        try {
            // Send to API
            const response = await sendChatMessageToAPI({
                user_id: 'user123',
                thread_id: 'thread1',
                message: input,
            })
            setApiResponse(response)
            // Add agent response to redux
            if (response.llm_response) {
                dispatch(
                    addMessage({
                        content: response.llm_response,
                        sender: 'agent',
                    }),
                )
            }
            // Store travel data in session storage for other components to use
            if (response.travel_data_objects) {
                sessionStorage.setItem(
                    'travelData',
                    JSON.stringify(response.travel_data_objects),
                )
            }
        } catch (error) {
            console.error('Error sending message:', error)
            dispatch(
                addMessage({
                    content:
                        'Sorry, there was an error processing your request. Please try again.',
                    sender: 'agent',
                }),
            )
        } finally {
            setLoading(false)
            setInput('')
        }
    }
    const handlePromptClick = (prompt: string) => {
        setInput(prompt)
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }
    // Get messages from redux
    const reduxMessages = useSelector((state: RootState) => state.chat.messages)
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 px-52 space-y-4">
                {reduxMessages.map((message, idx) => (
                    <div key={idx} className="flex flex-col">
                        <div
                            className={`max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                        >
                            <div
                                className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-[#FF5733] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                            >
                                {message.content}
                            </div>
                            {/* Show prompt suggestions after agent messages */}
                            {message.sender === 'agent' &&
                                idx === reduxMessages.length - 1 &&
                                apiResponse?.prompt_list && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {apiResponse.prompt_list.map((prompt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handlePromptClick(prompt)}
                                                className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 text-[#FF5733]"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            {/* Show initial prompt suggestions for the first message */}
                            {message.sender === 'agent' && idx === 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {parisResponse.prompt_list.map((prompt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePromptClick(prompt)}
                                            className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 text-[#FF5733]"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="self-start max-w-[75%] bg-gray-100 px-4 py-2 rounded-lg shadow">
                        <div className="flex space-x-2 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{
                                    animationDelay: '0.2s',
                                }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{
                                    animationDelay: '0.4s',
                                }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-10 px-36 border-t border-gray-200">
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-10 py-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask anything about Paris..."
                        className="flex-1 outline-none text-sm"
                        disabled={loading}
                    />
                    <div className="flex items-center gap-2 ml-2">
                        <button className="text-gray-400 hover:text-gray-600">
                            <MicIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            className={`rounded-full p-1.5 text-white ${loading ? 'bg-gray-400' : 'bg-[#FF5733] hover:bg-opacity-90'}`}
                            disabled={loading}
                        >
                            <SendIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/*<div className="flex justify-between mt-3 text-xs text-gray-500">
                    <button className="flex items-center">
                        <span className="mr-1">+</span>Tell me more
                    </button>
                    <button className="flex items-center">
                        <span className="mr-1">+</span>Show flights
                    </button>
                    <button className="flex items-center">
                        <span className="mr-1">+</span>Show hotels
                    </button>
                    <button className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300">
                        <MicIcon className="w-3 h-3" />
                    </button>
                </div>*/}
            </div>
        </div>
    )
}
