import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ found: false });
  }

  const { data, error } = await supabaseServer
    .from("recipes")
    .select("slug, title")
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    slug: data.slug,
  });
}
