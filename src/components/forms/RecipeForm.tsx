"use client";

import { useState } from "react";

export default function RecipeForm() {
  const [ingredientes, setIngredientes] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const gerarReceita = async () => {
    if (!ingredientes.trim()) {
      setError("Informe os ingredientes.");
      return;
    }

    setError("");
    setLoading(true);
    setHtml("");

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientes }),
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar receita");
      }

      const data = await res.json();
      setHtml(data.html);
    } catch (err) {
      setError("Não foi possível gerar a receita. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[120px] rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Ex: frango, alho, arroz, creme de leite..."
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
      />

      <button
        onClick={gerarReceita}
        disabled={loading}
        className="w-full rounded-lg bg-black p-3 text-white font-semibold hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Gerando receita..." : "Gerar Receita"}
      </button>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {html && (
        <div
          className="prose prose-lg max-w-none bg-white p-6 rounded-xl shadow"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
