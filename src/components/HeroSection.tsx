import { Search, Sparkles } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tool, getTools, recordRecentTool } from "@/data/mockData";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const allTools = getTools();
    return allTools.filter((t) =>
      t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    setOpen(results.length > 0 && query.trim().length > 0);
  }, [results, query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToolClick = (tool: Tool) => {
    recordRecentTool(tool.id);
    setQuery(tool.title);
    setOpen(false);
  };

  return (
    <section className="relative px-4 md:px-8 pt-12 pb-10 md:pt-20 md:pb-14 hero-gradient overflow-visible">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-56 h-56 bg-glow-secondary/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-secondary/80 border border-border/50 mb-6 glass">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-medium text-body2">智能发现，效率倍增</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-title tracking-tight mb-4 leading-tight">
          探索最佳 <span className="gradient-text">AI 工具</span>
        </h1>
        <p className="text-body2 text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
          Rita 为你精选数百款优质 AI 工具，助力工作效率提升
        </p>

        <div className="relative mx-auto group" style={{ maxWidth: '800px' }} ref={wrapperRef}>
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-60 dark:opacity-40"
            style={{ background: 'linear-gradient(135deg, rgba(82,82,229,0.35), rgba(111,214,180,0.35))' }}
          />
          <div className="relative p-[1.5px] rounded-xl search-border-animate overflow-visible">
            <div className="relative rounded-[10px] bg-card/90 backdrop-blur-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="搜索 AI 工具..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => { if (results.length > 0) setOpen(true); }}
                className="w-full pl-11 pr-4 py-3.5 rounded-[10px] bg-transparent text-title text-sm placeholder:text-body-desc outline-none ring-0 border-none shadow-none transition-all duration-300"
              />
            </div>
            {open && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-card border border-border/60 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <ul className="py-1.5 max-h-80 overflow-y-auto">
                  {results.map((tool) => (
                    <li key={tool.id}>
                      <button
                        className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-hover-bg transition-colors cursor-pointer"
                        onClick={() => handleToolClick(tool)}
                      >
                        <span className="text-lg shrink-0">{tool.icon}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-title truncate">{tool.title}</p>
                          <p className="text-xs text-body2 truncate">{tool.description}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
