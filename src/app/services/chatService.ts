export interface ChatRequest {
    user_id: string
    thread_id: string
    message: string
}

export interface ChatResponse {
    llm_response: string
    prompt_list: string[]
    travel_data_objects?: {
        experiences_object?: any[]
        day_wise_itinerary_object?: Record<string, any>
    }
}

export const sendChatMessage = (
    sendMessageFn: (msg: any) => void,
    data: ChatRequest,
) => {
    sendMessageFn(data)
}

export const sendChatMessageToAPI = async (
    data: ChatRequest,
): Promise<ChatResponse> => {
    try {
        const response = await fetch('https://travel-agent-ai.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error sending chat message:', error)
        // Return a fallback response in case of error
        return {
            llm_response:
                "Sorry, I couldn't connect to the service. Please try again later.",
            prompt_list: ['Try again'],
        }
    }
}
