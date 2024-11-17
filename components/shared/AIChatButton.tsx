"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Bot } from "lucide-react";

const AIChatButton = () => {
    const[chatBoxOpen,setChatBoxOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        className="rounded-full bg-purple-gradient px-4 py-2 text-white"
        onClick={()=>setChatBoxOpen(true)}
        >
            <Bot size={20} className="mr-2"/>
        
        AI Chatbot
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={()=>setChatBoxOpen(false)}/>
    </div>
  );
};

export default AIChatButton; 