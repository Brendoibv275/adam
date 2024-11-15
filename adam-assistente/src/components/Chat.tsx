'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/api';
import { FiSend } from 'react-icons/fi';

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rola para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const response = await sendMessage(userMessage.content);
      
      const assistantMessage: Message = {
        content: response.response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-100'
            } max-w-[85%]`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div className="text-xs text-gray-500 mt-2">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 p-4 rounded-lg animate-pulse">
            Pensando...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulário de input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-2 border rounded-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <FiSend /> Enviar
        </button>
      </form>
    </div>
  );
}