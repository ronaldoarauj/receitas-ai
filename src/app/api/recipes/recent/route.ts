import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("recipes")
    .select("title, slug, created_at, image_url")
    .order("created_at", { ascending: false })
    .limit(9);

  if (error) {
    return NextResponse.json({ recipes: [] }, { status: 500 });
  }

  return NextResponse.json({ recipes: data });
}
