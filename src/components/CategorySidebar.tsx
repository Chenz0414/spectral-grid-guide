import { categories } from "@/data/mockData";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export function CategorySidebar({ activeCategory, onCategoryClick }: CategorySidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-border/60 bg-card/80 glass h-screen sticky top-0 shrink-0">
      <div className="p-5 border-b border-border/60 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#6FD6B4] flex items-center justify-center">
          <Sparkles size={16} className="text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold gradient-text tracking-tight">Rita</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="section-label px-3 mb-3">分类导航</p>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryClick(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-menu-selected text-title shadow-sm glow-sm"
                    : "text-body2 hover:bg-hover-bg hover:text-title"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 mx-3 mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-[#6FD6B4]/10 border border-primary/10">
        <p className="text-xs font-semibold text-title mb-1">Rita Pro</p>
        <p className="text-[11px] text-body-desc leading-relaxed">解锁全部高级 AI 工具</p>
      </div>
    </aside>
  );
}
