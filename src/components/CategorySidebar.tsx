import { categories } from "@/data/mockData";
import { ThemeToggle } from "./ThemeToggle";

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export function CategorySidebar({ activeCategory, onCategoryClick }: CategorySidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card h-screen sticky top-0 shrink-0">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-bold gradient-text tracking-tight">Rita</h1>
        <ThemeToggle />
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <p className="text-xs font-medium text-body-desc uppercase tracking-wider px-3 mb-3">分类导航</p>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryClick(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-menu-selected text-title shadow-sm"
                    : "text-body2 hover:bg-hover-bg hover:text-title"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
