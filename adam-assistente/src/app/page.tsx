import Header from '@/components/Header';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <Chat />
      </div>
    </main>
  );
}