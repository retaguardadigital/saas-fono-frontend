import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex min-h-screen bg-gray-100">

        {/* MENU LATERAL */}
        <aside className="w-64 bg-white shadow-md p-5">
          <h1 className="text-xl font-bold mb-6">Meu Sistema</h1>

          <nav className="flex flex-col gap-3">
            <a href="/" className="hover:text-blue-600">Dashboard</a>
            <a href="/users" className="hover:text-blue-600">Usuários</a>
            <a href="#" className="hover:text-blue-600">Clientes</a>
            <a href="#" className="hover:text-blue-600">Templates</a>
          </nav>
        </aside>

        {/* CONTEÚDO */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </body>
    </html>
  );
}
