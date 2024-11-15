'use client';

import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{content: string, isUser: boolean}>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    setMessages(prev => [...prev, { content: message, isUser: true }]);

    try {
      const response = await fetch('http://localhost:3000/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { content: data.response, isUser: false }]);
        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
        }
      }

      setMessage('');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Digite sua mensagem..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;
