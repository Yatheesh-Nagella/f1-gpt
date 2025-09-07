"use client";
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
    <div className="main-container">
      {/* Remove the TAILWIND TEST line */}
      
      {/* Animated Background Elements */}
      <div className="bg-animated">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <div className="header-logo">
                <Zap size={24} color="white" />
              </div>
              <div>
                <h1 className="header-title">F1 GPT</h1>
                <p className="header-subtitle">Your Formula 1 AI Assistant</p>
              </div>
            </div>
            <div className="header-status">
              <div className="status-dot"></div>
              <span className="status-text">Online</span>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="chat-area">
          {noMessages ? (
            /* Welcome Section */
            <div className="welcome-section">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <Flag size={48} color="white" />
                </div>
                <h2 className="welcome-title">Welcome to F1 GPT</h2>
                <p className="welcome-text">
                  Your ultimate Formula 1 knowledge companion. Ask me anything about racing, drivers, teams, statistics, and history!
                </p>
              </div>

              {/* Suggestion Cards */}
              <PromptSuggestionRow onPromptClick={handlePrompt} />
            </div>
          ) : (
            /* Messages */
            <div className="messages-container">
              {messages.map((message, index) => (
                <Bubble key={`message-${index}`} message={message} />
              ))}
              {isLoading && <LoadingBubble />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <form onSubmit={handleSubmit} className="input-form">
              <input
                className="input-field"
                onChange={handleInputChange}
                value={input}
                placeholder="Ask me anything about Formula 1..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="submit-button"
              >
                <Send size={20} />
              </button>
            </form>
            <p className="input-disclaimer">
              F1 GPT can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;