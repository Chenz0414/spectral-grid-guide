import { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useCategoriesWithTools, useRecentTools, usePopularTools } from "@/hooks/useData";
import { HeroSection } from "@/components/HeroSection";
import { HorizontalToolList } from "@/components/HorizontalToolList";
import { PopularToolList } from "@/components/PopularToolList";
import { CategoryFloor } from "@/components/CategoryFloor";

const Index = () => {
  const location = useLocation();
  const { setActiveCategory } = useOutletContext<{ setActiveCategory: (id: string) => void }>();
  const categoriesWithTools = useCategoriesWithTools();
  const recentTools = useRecentTools();
  const popularTools = usePopularTools();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setActiveCategory(scrollTo);
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setActiveCategory]);

  return (
    <>
      <HeroSection />
      <HorizontalToolList title="🕐 最近使用" tools={recentTools} />
      <PopularToolList title="🔥 热门工具" tools={popularTools} />
      <div className="mt-4">
        {categoriesWithTools.map((cat) => (
          <CategoryFloor key={cat.id} category={cat} />
        ))}
      </div>
    </>
  );
};

export default Index;
