import { useCategories } from "@/hooks/useData";
import { ThemeToggle } from "./ThemeToggle";
import { PanelLeftClose, PanelLeftOpen, Briefcase, Image, Film, Headphones, PenTool, Code, Home, Settings, Globe, Zap, Layers, Cpu, MessageSquare, BookOpen, Palette, Music, Video, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Briefcase, Image, Film, Headphones, PenTool, Code,
  Globe, Zap, Layers, Cpu, MessageSquare, BookOpen, Palette, Music, Video, Camera,
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
  const categories = useCategories();

  const handleCategoryClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      onCategoryClick(id);
    }
  };

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border/60 bg-card/80 glass h-screen sticky top-0 shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden ${
        collapsed ? "w-[68px]" : "w-[200px]"
      }`}
    >
      {/* Header */}
      <div className={`border-b border-border/60 flex items-center shrink-0 ${collapsed ? "justify-center p-3" : "p-5"}`}>
        {!collapsed && (
            <h1 className="text-lg font-bold text-title tracking-tight whitespace-nowrap">AI工具</h1>
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
          <div className="ml-auto flex items-center gap-0.5 shrink-0">
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
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-4 ${collapsed ? "px-2" : "px-3"}`}>
        {!collapsed && <p className="section-label px-3 mb-3 whitespace-nowrap">分类导航</p>}
        <ul className="space-y-0.5">
          {/* 首页 */}
          <li>
            {collapsed ? (
              <button
                onClick={() => { onCategoryClick(""); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                title="首页"
                className="w-full flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 cursor-pointer text-body2 hover:bg-hover-bg hover:text-title"
              >
                <Home size={20} />
              </button>
            ) : (
              <button
                onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 text-body2 hover:bg-hover-bg hover:text-title whitespace-nowrap"
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
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 whitespace-nowrap ${
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

      {/* Admin link */}
      <div className={`border-t border-border/60 shrink-0 ${collapsed ? "p-2" : "p-3"}`}>
        {collapsed ? (
          <button
            onClick={() => navigate("/admin")}
            title="管理配置"
            className="w-full flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 cursor-pointer text-body2 hover:bg-hover-bg hover:text-title"
          >
            <Settings size={20} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 text-body2 hover:bg-hover-bg hover:text-title whitespace-nowrap"
          >
            <Settings size={16} className="shrink-0" />
            <span>管理配置</span>
          </button>
        )}
      </div>
    </aside>
  );
}
