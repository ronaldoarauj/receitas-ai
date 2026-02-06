import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          Receitas.ai
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/">Início</Link>
          <Link href="/categorias">Categorias</Link>
          <Link href="/receitas">Receitas</Link>
        </nav>

        {/* Busca */}
        {/* <form className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Buscar receita..."
            className="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </form> */}
      </div>
    </header>
  );
}
