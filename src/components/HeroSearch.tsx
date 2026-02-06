"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const buscar = () => {
    if (!query.trim()) return;
    router.push(`/busca/${encodeURIComponent(query)}`);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Encontre receitas deliciosas ou gere a sua com IA!
        </h1>

        <div className="flex gap-3 justify-center">
          <input
            className="w-full max-w-lg border rounded-lg p-4 focus:outline-none"
            placeholder="Ex: Bolo de chocolate"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={buscar}
            className="bg-black text-white px-6 py-4 rounded-lg font-semibold"
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
