/*
import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch (error) {
                console.error("Invalid message from server:", event.data);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
            setIsConnected(false);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        wsRef.current = ws;

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = (message: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage, isConnected };
}
*/
"use client";
import { useEffect, useRef, useState } from "react";

export function useWebSocket(url: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setIsConnected(true);
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch {
                console.error("Invalid message:", event.data);
            }
        };

        ws.onclose = () => setIsConnected(false);
        ws.onerror = (err) => console.error("WebSocket error:", err);

        wsRef.current = ws;
        return () => ws.close();
    }, [url]);

    const sendMessage = (message: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage, isConnected };
}
