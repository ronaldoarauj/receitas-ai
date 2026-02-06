import Footer from "@/components/Footer"
import Header from "@/components/Header";
import RecentRecipes from "@/components/RecentRecipes";
import RecipeSearch from "@/components/RecipeSearch";

export default function Home() {
  return (
    <>

    <Header />
      <main>
        <RecipeSearch />

        <RecentRecipes />
      </main>
            <Footer />
    </>
  );
}
