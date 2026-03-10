import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative px-4 md:px-8 pt-12 pb-10 md:pt-20 md:pb-14 hero-gradient overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-56 h-56 bg-[#6FD6B4]/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-2xl mx-auto text-center">
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

        <div className="relative max-w-lg mx-auto group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-[#6FD6B4]/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-body-desc" />
            <input
              type="text"
              placeholder="搜索 AI 工具..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border text-title text-sm placeholder:text-body-desc focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 glass-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
