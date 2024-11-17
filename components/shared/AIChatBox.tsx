import { cn } from "@/lib/utils";
import { Send, Loader2, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { generateChatResponse } from "@/lib/chat";

interface AIChatBoxProps {
    open: boolean;
    onClose: () => void;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await generateChatResponse(input);
            
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Something went wrong'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36", open ? "fixed" : "hidden")}>
            <button onClick={onClose} className="mb-1 ms-auto block">
                <XCircle size={30} />
            </button>
            <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
                <div className="h-full overflow-y-auto p-4">
                    {messages.map((message) => (
                        <ChatMessage message={message} key={message.id} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-center">
                            Error: {error.message}
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                    </Button>
                </form>
            </div>
        </div>
    );
}

function ChatMessage({ message: { role, content } }: { message: ChatMessage }) {
    return (
        <div className={cn("mb-3 px-4 py-2",
            role === "user" ? "bg-white" : "bg-gray-100"
        )}>
            <div className="font-semibold mb-1 text-sm">
                {role === "user" ? "You" : "AI"}
            </div>
            <div className="text-gray-700">{content}</div>
        </div>
    );
}