import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">ADAM</h1>
          <span className="text-sm text-gray-500">Assistente de IA</span>
        </div>
      </header>
      <main className="flex-1">
        <Chat />
      </main>
    </div>
  );
}