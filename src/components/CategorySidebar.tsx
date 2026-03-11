import { categories } from "@/data/mockData";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, PanelLeftClose, PanelLeftOpen, Briefcase, Image, Film, Headphones, PenTool, Code, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Image,
  Film,
  Headphones,
  PenTool,
  Code,
};

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function CategorySidebar({ activeCategory, onCategoryClick, collapsed, onToggleCollapse }: CategorySidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      onCategoryClick(id);
    }
  };
  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border/60 bg-card/80 glass h-screen sticky top-0 shrink-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[68px]" : "w-60"
      }`}
    >
      {/* Header */}
      <div className={`border-b border-border/60 flex items-center ${collapsed ? "justify-center p-3" : "p-5"}`}>
        {!collapsed && (
          <>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#6FD6B4] flex items-center justify-center">
              <Sparkles size={16} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gradient-text tracking-tight ml-2.5">Rita</h1>
          </>
        )}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer"
            aria-label="展开侧边栏"
          >
            <PanelLeftOpen size={18} className="text-body2" />
          </button>
        )}
        {!collapsed && (
          <div className="ml-auto flex items-center gap-0.5">
            <ThemeToggle />
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer"
              aria-label="收起侧边栏"
            >
              <PanelLeftClose size={18} className="text-body2" />
            </button>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 ${collapsed ? "px-2" : "px-3"}`}>
        {!collapsed && <p className="section-label px-3 mb-3">分类导航</p>}
        <ul className="space-y-0.5">
          {/* 首页 */}
          <li>
            {collapsed ? (
              <button
                onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                title="首页"
                className="w-full flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 cursor-pointer text-body2 hover:bg-hover-bg hover:text-title"
              >
                <Home size={20} />
              </button>
            ) : (
              <button
                onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 text-body2 hover:bg-hover-bg hover:text-title"
              >
                <Home size={16} className="shrink-0" />
                <span>首页</span>
              </button>
            )}
          </li>
          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon];
            return (
              <li key={cat.id}>
                {collapsed ? (
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    title={cat.name}
                    className={`w-full flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-menu-selected text-primary shadow-sm glow-sm"
                        : "text-body2 hover:bg-hover-bg hover:text-title"
                    }`}
                  >
                    {IconComp && <IconComp size={20} />}
                  </button>
                ) : (
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                      activeCategory === cat.id
                        ? "bg-menu-selected text-title shadow-sm glow-sm"
                        : "text-body2 hover:bg-hover-bg hover:text-title"
                    }`}
                  >
                    {IconComp && <IconComp size={16} className="shrink-0" />}
                    <span>{cat.name}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro card - only when expanded */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-[#6FD6B4]/10 border border-primary/10">
          <p className="text-xs font-semibold text-title mb-1">Rita Pro</p>
          <p className="text-[11px] text-body-desc leading-relaxed">解锁全部高级 AI 工具</p>
        </div>
      )}
    </aside>
  );
}
