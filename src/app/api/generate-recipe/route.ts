import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { GoogleGenAI } from "@google/genai";
import { fetchRecipeImage } from "@/lib/recipeImage";
/* ========= Gemini ========= */
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

/* ========= Utils ========= */
function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/* ========= Route ========= */
export async function POST(req: Request) {
    try {
        const { ingredientes } = await req.json();

        if (!ingredientes) {
            return NextResponse.json(
                { error: "Ingredientes são obrigatórios" },
                { status: 400 }
            );
        }

        const prompt = `
Crie uma receita em HTML PURO.

Regras IMPORTANTES:
- NÃO use markdown
- NÃO use html
- NÃO use crases
- Retorne APENAS HTML
- Comece diretamente com <h2>

Estrutura:
- <h2> Nome da receita
- <h3> Ingredientes
- <ul>
- <h3> Modo de preparo
- <ol>

Ingredientes:
${ingredientes}
    `;

        /* ========= Gemini ========= */
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        if (!result.text) {
            throw new Error("Gemini não retornou HTML");
        }

        let html = result.text;

        // Remove blocos ```html e ```
        html = html
            .replace(/```html/gi, "")
            .replace(/```/g, "")
            .trim();


        /* ========= Extrair título ========= */
        const titleMatch = html.match(/<h2>(.*?)<\/h2>/);
        const title = titleMatch ? titleMatch[1] : ingredientes;
        const slug = slugify(title);
        const imageUrl = await fetchRecipeImage(title);

        /* ========= Salvar no Supabase ========= */
        const { error } = await supabaseServer.from("recipes").insert({
            title,
            slug,
            html,
            image_url: imageUrl,
        });

        if (error) throw error;

        return NextResponse.json({ slug });
    } catch (error: any) {
        console.error("ERRO AO GERAR RECEITA:", error);

        return NextResponse.json(
            {
                error: error?.message ?? String(error),
                stack: error?.stack ?? null,
            },
            { status: 500 }
        );
    }

}
