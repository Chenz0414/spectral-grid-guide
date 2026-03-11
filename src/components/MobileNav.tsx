import { categories } from "@/data/mockData";
import { Menu, X, Sparkles, Briefcase, Image, Film, Headphones, PenTool, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeToggle } from "./ThemeToggle";

const iconMap: Record<string, LucideIcon> = {
  Briefcase, Image, Film, Headphones, PenTool, Code,
};

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
    <div className="md:hidden sticky top-0 z-50 bg-card/80 glass border-b border-border/60">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-[#6FD6B4] flex items-center justify-center">
            <Sparkles size={14} className="text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold gradient-text">Rita</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer">
            {open ? <X size={20} className="text-title" /> : <Menu size={20} className="text-title" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-0.5 border-t border-border/60 pt-3">
          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                  activeCategory === cat.id
                    ? "bg-menu-selected text-title glow-sm"
                    : "text-body2 hover:bg-hover-bg"
                }`}
              >
                {IconComp && <IconComp size={16} className="shrink-0" />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
