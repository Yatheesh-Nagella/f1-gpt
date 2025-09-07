"use client";
import { useChat } from "ai/react";
import { Message } from "ai";
import { useRef, useEffect } from "react";
import { Send, Zap, Trophy, Flag, Clock, Users, Home as HomeIcon, ExternalLink } from 'lucide-react';
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

  const handleHomeClick = () => {
    // Clear messages and reset to home state
    // You'll need to add a reset function to your useChat hook
    window.location.reload(); // Simple approach, or use router.refresh() if you have next/navigation
  };

  const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
  const handleGitHubClick = () => {
    window.open('https://github.com/Yatheesh-Nagella/f1-gpt', '_blank');
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

            <div className="header-right">
              <div className="header-buttons">
                <button
                  onClick={handleHomeClick}
                  className="header-button"
                  title="Return to home"
                >
                  <HomeIcon size={18} />
                </button>

                <button
                  onClick={handleGitHubClick}
                  className="header-button"
                  title="View source code"
                >
                  <GitHubIcon/>
                </button>
              </div>

              <div className="header-status">
                <div className="status-dot"></div>
                <span className="status-text">Online</span>
              </div>
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