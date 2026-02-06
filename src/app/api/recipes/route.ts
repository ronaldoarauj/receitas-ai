import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ found: false });
  }

  const slug = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data } = await supabaseServer
    .from("recipes")
    .select("slug")
    .eq("slug", slug)
    .single();

  if (data) {
    return NextResponse.json({
      found: true,
      slug: data.slug,
    });
  }

  return NextResponse.json({ found: false });
}
