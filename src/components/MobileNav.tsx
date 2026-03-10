import { categories } from "@/data/mockData";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export function MobileNav({ activeCategory, onCategoryClick }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    onCategoryClick(id);
    setOpen(false);
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold gradient-text">Rita</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer">
            {open ? <X size={20} className="text-title" /> : <Menu size={20} className="text-title" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-1 border-t border-border pt-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-menu-selected text-title"
                  : "text-body2 hover:bg-hover-bg"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
