"use client";
import Image from "next/image";
import f1GPTLogo from "./assets/logo.webp";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useRef, useEffect } from "react";
import { Send, Zap, Trophy, Flag, Clock, Users } from 'lucide-react';
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionsRow";

const Home = () => {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const noMessages = !messages || messages.length === 0;
  
  const handlePrompt = (promptText: string) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    };
    append(msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-2xl opacity-5 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Racing Stripes */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500 to-transparent transform skew-x-12 translate-x-full animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-black/50 backdrop-blur-lg border-b border-red-500/30 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-400 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/25">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                  F1 GPT
                </h1>
                <p className="text-gray-400 text-sm">Your Formula 1 AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {noMessages ? (
                /* Welcome Section */
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-red-500/25 animate-pulse">
                      <Flag className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                      Welcome to F1 GPT
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      Your ultimate Formula 1 knowledge companion. Ask me anything about racing, drivers, teams, statistics, and history!
                    </p>
                  </div>

                  {/* Your existing PromptSuggestionRow component */}
                  <div className="max-w-4xl mx-auto">
                    <PromptSuggestionRow onPromptClick={handlePrompt} />
                  </div>
                </div>
              ) : (
                /* Messages using your existing Bubble component */
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <Bubble key={`message-${index}`} message={message} />
                  ))}
                  {isLoading && <LoadingBubble />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area - Using your existing form logic */}
            <div className="px-6 pb-6">
              <div className="relative max-w-4xl mx-auto">
                <form 
                  onSubmit={handleSubmit}
                  className="relative flex items-center bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl"
                >
                  <input
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 rounded-l-2xl focus:outline-none focus:ring-0 text-lg"
                    onChange={handleInputChange}
                    value={input}
                    placeholder="Ask me anything about Formula 1..."
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-r-2xl hover:from-red-500 hover:to-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-red-500/25"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                <p className="text-center text-xs text-gray-500 mt-3">
                  F1 GPT can make mistakes. Consider checking important information.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;