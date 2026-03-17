import { useState, useCallback } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useCategoriesWithTools } from "@/hooks/useData";
import { CategorySidebar } from "@/components/CategorySidebar";
import { MobileNav } from "@/components/MobileNav";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const categoriesWithTools = useCategoriesWithTools();
  const [activeCategory, setActiveCategory] = useState(categoriesWithTools[0]?.id || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleCategoryClick = useCallback((id: string) => {
    setActiveCategory(id);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <CategorySidebar
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <main className="flex-1 overflow-y-auto pb-12">
          <Outlet context={{ activeCategory, setActiveCategory }} />
        </main>
      </div>
    </div>
  );
}
