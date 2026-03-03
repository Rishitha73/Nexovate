import { useMemo, useRef, useState } from 'react';
import { chatbotService } from '../services/chatbotService';
import './ChatbotWidget.css';

const BotIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="bot-bg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67D7EA" />
        <stop offset="1" stopColor="#4FA8F8" />
      </linearGradient>
    </defs>

    <circle cx="32" cy="32" r="28" fill="url(#bot-bg)" />

    <circle cx="22" cy="31" r="3.4" fill="#E5E7EB" />
    <circle cx="42" cy="31" r="3.4" fill="#E5E7EB" />

    <path d="M24 20v-5M40 20v-5" stroke="#E5E7EB" strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="24" cy="14.2" r="2.4" stroke="#E5E7EB" strokeWidth="2.2" />
    <circle cx="40" cy="14.2" r="2.4" stroke="#E5E7EB" strokeWidth="2.2" />

    <rect x="12" y="23" width="40" height="24" rx="9" fill="#ECEDEE" />
    <rect x="15.5" y="26.5" width="33" height="16.5" rx="7" fill="#191933" />
    <circle cx="24.5" cy="34.5" r="4.2" fill="#56DDF0" />
    <circle cx="39.5" cy="34.5" r="4.2" fill="#56DDF0" />
    <path d="M27.8 40.2c2.4 2 6 2 8.4 0" stroke="#F5F5F5" strokeWidth="2.4" strokeLinecap="round" />

    <path d="M27 47h10c1.1 0 2 .9 2 2v1H25v-1c0-1.1.9-2 2-2z" fill="#ECEDEE" />
    <path d="M24 50h16c2.5 0 4.6 1.8 5 4H19c.4-2.2 2.5-4 5-4z" fill="#D7D8D9" />
  </svg>
);

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I am Nexovate AI ✨ Ask me about your dashboard, profile, or job search strategy.'
    }
  ]);
  const initialMessage = {
    role: 'assistant',
    content: 'Hi, I am Nexovate AI ✨ Ask me about your dashboard, profile, or job search strategy.'
  };
  const viewportRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const handleSend = async () => {
    if (!canSend) return;

    const userMessage = { role: 'user', content: input.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const { reply } = await chatbotService.sendMessage(
        userMessage.content,
        nextMessages.map((msg) => ({ role: msg.role, content: msg.content }))
      );

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      const fallback = error?.response?.data?.message || 'I am having trouble connecting right now. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInput('');
    setMessages([initialMessage]);
  };

  return (
    <div className="chatbot-root">
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Nexovate AI Chatbot">
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-orb"><BotIcon size={22} /></div>
              <div>
                <p className="chatbot-title">Nexovate AI</p>
                <p className="chatbot-subtitle">Gemini Assistant</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button className="chatbot-header-btn" onClick={handleMinimize} aria-label="Minimize chat">
                —
              </button>
              <button className="chatbot-header-btn" onClick={handleClose} aria-label="Close chat">
                ✕
              </button>
            </div>
          </div>

          <div className="chatbot-messages" ref={viewportRef}>
            {messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`chatbot-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-bubble assistant chatbot-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="chatbot-input-wrap">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask Nexovate AI..."
              rows={1}
            />
            <button className="chatbot-send" onClick={handleSend} disabled={!canSend}>
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          className="chatbot-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <BotIcon size={34} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
