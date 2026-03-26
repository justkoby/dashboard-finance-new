import { useState } from 'react';
import amaBrain from '../assets/ama_brain.png';
import './ChatWidget.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: input }]);
    setInput('');
    // fake bot reply
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: "Hello! I'm Ama, your financial assistant. How can I help you today?" }]);
    }, 800);
  };

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <div className="chat-toggle" onClick={() => setOpen((o) => !o)}>
        <img src={amaBrain} alt="Ama" className="ama-icon" />
        <span>{open ? 'Close' : 'Talk to Ama'}</span>
      </div>
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <img src={amaBrain} alt="Ama" className="ama-header-icon" />
            <span>Chat with Ama</span>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="msg bot">Hello! I'm Ama. Ask me anything about your finances.</div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`msg ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
