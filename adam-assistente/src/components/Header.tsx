export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">ADAM</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            v0.1.0
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Modelo: Mistral 7B
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}