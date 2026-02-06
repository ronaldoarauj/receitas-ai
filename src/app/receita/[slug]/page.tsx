import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function ReceitaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await supabaseServer
    .from("recipes")
    .select("title, html, image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return <p>Receita não encontrada.</p>;
  }

  return (
    <>
      <Header />

      <article className="max-w-4xl mx-auto p-6">
        {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </article>
      <Footer />
    </>
  );
}
