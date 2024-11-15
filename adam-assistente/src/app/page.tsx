import Chat from '@/components/Chat';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Chat />
      </main>
    </div>
  );
}