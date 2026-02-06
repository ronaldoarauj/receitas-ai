"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

type Recipe = {
  title: string;
  slug: string;
  created_at: string;
  image_url: string | null;
};

export default function RecentRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes/recent")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes || []));
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Receitas Recentes</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.slug}
              title={recipe.title}
              slug={recipe.slug}
              date={recipe.created_at}
              image_url={recipe.image_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
