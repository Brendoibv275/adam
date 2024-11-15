'use client';

import { useState } from 'react';
import { sendMessage } from '../services/api';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // Adiciona mensagem do usuário
      const userMessage: Message = { content: input, role: 'user' };
      setMessages(prev => [...prev, userMessage]);
      
      // Envia para a API
      const response = await sendMessage(input);
      
      // Adiciona resposta do assistente
      const assistantMessage: Message = {
        content: response.response,
        role: 'assistant'
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Limpa o input
      setInput('');
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
            } max-w-[80%] whitespace-pre-wrap`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 p-4 rounded-lg animate-pulse">
            Pensando...
          </div>
        )}
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}