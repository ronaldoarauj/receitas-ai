export async function fetchRecipeImage(title: string) {
  const query = encodeURIComponent(title + " comida");

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data.photos?.[0]?.src?.large || null;
}
