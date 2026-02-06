"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const buscarReceita = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      // 1️⃣ Buscar no banco
      const res = await fetch(`/api/recipes?query=${query}`);
      const data = await res.json();

      if (data.found && data.slug) {
        router.push(`/receita/${data.slug}`);
        return;
      }

      // 2️⃣ Não encontrou → gerar com IA
      const gen = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientes: query }),
      });

      const genData = await gen.json();

      if (genData.slug) {
        router.push(`/receita/${genData.slug}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Encontre receitas deliciosas!
        </h1>

        <div className="flex gap-3 justify-center">
          <input
            className="w-full max-w-lg border rounded-lg p-4 focus:outline-none"
            placeholder="Ex: Bolo de chocolate"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
        onClick={buscarReceita}
        disabled={loading}
        className="rounded-lg bg-black px-6 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
        </div>
      </div>
    </section>

    
  );
}
