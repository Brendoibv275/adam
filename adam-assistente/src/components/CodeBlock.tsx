'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="p-2 bg-gray-800 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
          title="Copiar código"
        >
          {isCopied ? <FiCheck /> : <FiCopy />}
        </button>
      </div>
      <div className="bg-gray-800 rounded-t-md px-4 py-2 text-xs text-gray-400">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '0.375rem',
          borderBottomRightRadius: '0.375rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}