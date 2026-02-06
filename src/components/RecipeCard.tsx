import Link from "next/link";

export default function RecipeCard({
  title,
  slug,
  date,
  image_url,
}: {
  title: string;
  slug: string;
  date?: string;
  image_url?: string | null;
  
}) {
  return (
    <Link
      href={`/receita/${slug}`}
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
    >
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="h-48 w-full object-cover group-hover:scale-105 transition"
        />
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {date && (
        <p className="text-sm text-gray-500 mt-2">
          {new Date(date).toLocaleDateString("pt-BR")}
        </p>
      )}
    </Link>
  );
}
