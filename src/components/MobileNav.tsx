import { useCategories } from "@/hooks/useData";
import { Menu, X, Home, Briefcase, Image, Film, Headphones, PenTool, Code, Globe, Zap, Layers, Cpu, MessageSquare, BookOpen, Palette, Music, Video, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const iconMap: Record<string, LucideIcon> = {
  Briefcase, Image, Film, Headphones, PenTool, Code,
  Globe, Zap, Layers, Cpu, MessageSquare, BookOpen, Palette, Music, Video, Camera,
};

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export function MobileNav({ activeCategory, onCategoryClick }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useCategories();

  const handleClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      onCategoryClick(id);
    }
    setOpen(false);
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-card/80 glass border-b border-border/60">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-title tracking-tight">AI工具</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer">
            {open ? <X size={20} className="text-title" /> : <Menu size={20} className="text-title" />}
          </button>
        </div>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 top-[57px] bg-background/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full z-50 bg-card border-b border-border/60 shadow-xl px-4 pb-4 space-y-0.5 pt-3 max-h-[70vh] overflow-y-auto">
            {/* 首页 */}
            <button
              onClick={() => { onCategoryClick(""); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                !activeCategory
                  ? "bg-menu-selected text-title glow-sm"
                  : "text-body2 hover:bg-hover-bg"
              }`}
            >
              <Home size={16} className="shrink-0" />
              <span>首页</span>
            </button>
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
        </>
      )}
    </div>
  );
}
