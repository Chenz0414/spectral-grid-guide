import { useState, useCallback } from "react";
import { categories, recentTools, popularTools } from "@/data/mockData";
import { CategorySidebar } from "@/components/CategorySidebar";
import { MobileNav } from "@/components/MobileNav";
import { HeroSection } from "@/components/HeroSection";
import { HorizontalToolList } from "@/components/HorizontalToolList";
import { CategoryFloor } from "@/components/CategoryFloor";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const handleCategoryClick = useCallback((id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <CategorySidebar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <main className="flex-1 overflow-y-auto pb-12">
          <HeroSection />
          <HorizontalToolList title="🕐 最近使用" tools={recentTools} />
          <HorizontalToolList title="🔥 热门工具" tools={popularTools} />
          <div className="mt-4">
            {categories.map((cat) => (
              <CategoryFloor key={cat.id} category={cat} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
